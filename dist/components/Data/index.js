import './index.css';
import React from 'react';
import classnames from 'classnames';
import { faCog, faPencilAlt, faTimes, faDivide, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dsvFormat, tsvParse, csvParse } from 'd3-dsv';
import moment from 'moment';
import flow from 'lodash/flow';
import countBy from 'lodash/countBy';
import entries from 'lodash/entries';
import partialRight from 'lodash/partialRight';
import maxBy from 'lodash/maxBy';
import head from 'lodash/head';
import { format } from 'd3-format';
import { FixedSizeList } from 'react-window';
import keys from 'lodash/keys';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var styles = {"component":"chartwerk_ui_components___2cqd8bK7hI","spinAround":"chartwerk_ui_components___FNc774so1i"};

var INPUT = 'input';
var EDIT = 'edit';
var MAP = 'map';
var END = 'end';

var styles$1 = {"component":"chartwerk_ui_components___3pX6qViLQf"};

// Regexes used to type and split string data input by a user

/**
 * Used to split string data input.
 */
var NEWLINE = /\r?\n/;
/**
 * Test for separated value formats, run on the first line
 * of the string data.
 */

var PSV = /^[\w_\- ]+\|[\w_\- ]+/;
var TSV = /^[\w_\- ]+\t[\w_\- ]+/;
var CSV = /^[\w_\- ]+,[\w_\- ]+/;
/**
 * Test for date formats parseable by JS Date operator
 */

var DATE = /^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/;
/**
 * If it's got an @, we type it a string.
 */

var EMAIL = /@/;

var dateFormats = ['MM/YY', 'M/YY', 'MM/YYYY', 'M/YYYY', 'MM/DD/YY', 'M/D/YY', 'MM/DD/YYYY', 'M/D/YYYY', 'MM-DD-YY', 'M-D-YY', 'MM-DD-YYYY', 'M-D-YYYY', 'YYYY-MM-DD', 'YYYY-M-D', 'MMM DD, YYYY', 'MMM. DD, YYYY', 'MMM D, YYYY', 'MMM. D, YYYY'];

var parseString = function parseString(string) {
  return string.trim();
};
var parseDate = function parseDate(string) {
  var value = string.trim();
  var parsed;
  if (DATE.test(value)) return new Date(value);
  if ((parsed = moment(value, dateFormats, true)).isValid()) return parsed.utc().toDate();
  return null;
}; // Modified from https://github.com/ExodusMovement/parse-num

var parseNumber = function parseNumber(value) {
  // TODO make configurable
  var decimalSeparator = '.';
  if (value == null) return NaN; // Return the value as-is if it's already a number:

  if (typeof value === 'number') return value;
  if (typeof value === 'string') value = value.trim(); // build regex to strip out everything except digits, decimal point and minus sign:

  var regex = new RegExp("[^0-9-".concat(decimalSeparator, "]"), ['g']);
  var unformatted = value.toString().replace(regex, '') // strip out any cruft
  .replace(decimalSeparator, '.'); // make sure decimal point is standard

  return parseFloat(unformatted);
};
var parseType = function parseType(value) {
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (value instanceof Date) return 'date';
};
var parseByType = function parseByType(value, type) {
  switch (type) {
    case 'date':
      return parseDate(value);

    case 'number':
      return parseNumber(value);

    default:
      return parseString(value);
  }
};
/**
 * Determines the most frequent data type in an autotyped array.
 *
 * Returns the majority type and a boolean that indicates whether
 * all data were of that type. We use that boolean to determine
 * if we need to re-parse the column data.
 */

var parseMajorityType = function parseMajorityType(dataArray) {
  var typeArray = dataArray.map(function (d) {
    return parseType(d);
  }); // 👇 fuck if I know how this works...  ¯\_(ツ)_/¯

  var majorityType = flow(countBy, entries, partialRight(maxBy, '[1]'), head)(typeArray);
  return {
    majorityType: majorityType,
    unanimous: countBy(typeArray, function (d) {
      return d;
    })[majorityType] === typeArray.length
  };
};

/**
 * Guesses the datatype of a string value.
 *
 * Mostly d3's dsv autoType, but with additional date parsing and a few more
 * explicit checks.
 *
 * NOTE: this sequence is biased to prefer typing as a number, so dates
 * like YYYY are parsed as numbers.
 */

var autoTypeString = function autoTypeString(string) {
  var value = parseString(string);
  var number;
  var date;
  if (!value) return null;
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
  if (value === 'NaN') return NaN;
  if (value === 'null') return null;
  if (EMAIL.test(value)) return value;
  if (!isNaN(number = +value)) return number;
  if ((date = parseDate(value)) instanceof Date) return date;
  if (!isNaN(number = parseNumber(value))) return number;
  return value;
};
var autoTyper = function autoTyper(object) {
  for (var key in object) {
    object[key] = autoTypeString(object[key]);
  }

  return object;
};
var stringTyper = function stringTyper(object) {
  for (var key in object) {
    object[key] = object[key].trim();
  }

  return object;
};

function parsePSV(data, typer) {
  var headerRow = data.split(NEWLINE)[0];
  if (!PSV.test(headerRow)) return null;
  var parsed = dsvFormat('|').parse(data, typer);
  parsed.dataType = 'psv';
  return parsed;
}

function parseTSV(data, typer) {
  var headerRow = data.split(NEWLINE)[0];
  if (!TSV.test(headerRow)) return null;
  var parsed = tsvParse(data, typer);
  parsed.dataType = 'tsv';
  return parsed;
}

function parseCSV(data, typer) {
  var headerRow = data.split(NEWLINE)[0];
  if (!CSV.test(headerRow)) return null;
  var parsed = csvParse(data, typer);
  parsed.dataType = 'csv';
  return parsed;
}

var parseToStrings = function parseToStrings(dataString) {
  return parsePSV(dataString, stringTyper) || parseTSV(dataString, stringTyper) || parseCSV(dataString, stringTyper);
};
var parseToTypes = function parseToTypes(dataString) {
  return parsePSV(dataString, autoTyper) || parseTSV(dataString, autoTyper) || parseCSV(dataString, autoTyper);
};

/**
 * Retypes a column of data in a collection.
 * @param  {Array} typedCollection  The collection with the column whose type
 *                                   you want to change.
 * @param  {Array} stringCollection The same data in a collection where all
 *                                   data is typed a string.
 * @param  {String} column           The column you want to re-type
 * @param  {String} type             The type to re-type the column
 * @return {Array}                  The re-typed collection.
 */

var explicitlyTypeCollectionByColumn = function explicitlyTypeCollectionByColumn(typedCollection, stringCollection, column, type) {
  stringCollection.forEach(function (obj, i) {
    if (parseType(typedCollection[i][column]) !== type) {
      typedCollection[i][column] = parseByType(obj[column], type);
    }
  });
  return typedCollection;
};

var TextInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TextInput, _React$Component);

  function TextInput(props) {
    var _this;

    _classCallCheck(this, TextInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextInput).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "startParsing", function () {
      _this.setState({
        parsing: true
      });

      setTimeout(_this.parseDataString, 500);
    });

    _defineProperty(_assertThisInitialized(_this), "parseDataString", function () {
      _this.setState({
        parseError: false
      });

      var sendState = _this.props.sendState;
      var stringData = parseToStrings(_this.state.value);
      var typedData = parseToTypes(_this.state.value);

      if (!typedData) {
        _this.setState({
          parseError: true,
          parsing: false
        });

        return;
      }

      var columnTypes = {};
      var columns = typedData.columns.slice();
      columns.forEach(function (column) {
        var _parseMajorityType = parseMajorityType(typedData.map(function (obj) {
          return obj[column];
        })),
            majorityType = _parseMajorityType.majorityType,
            unanimous = _parseMajorityType.unanimous;

        columnTypes[column] = majorityType;

        if (!unanimous) {
          typedData = explicitlyTypeCollectionByColumn(typedData, stringData, column, majorityType);
        }
      });
      sendState({
        stringData: stringData,
        typedData: typedData,
        columnTypes: columnTypes,
        columnTransforms: {},
        dataMap: {},
        rawData: _this.state.value,
        view: EDIT
      });
    });

    _this.state = {
      value: props.defaultValue,
      parseError: false,
      parsing: false
    };
    return _this;
  }

  _createClass(TextInput, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          value = _this$state.value,
          parseError = _this$state.parseError,
          parsing = _this$state.parsing;
      return React.createElement("div", {
        className: classnames(styles$1.component)
      }, React.createElement("div", {
        className: "message"
      }, React.createElement("p", null, "Paste your data in the box below. ", React.createElement("b", null, "Make sure your data includes a header row."))), React.createElement("textarea", {
        value: value,
        onChange: function onChange(e) {
          return _this2.setState({
            value: e.target.value
          });
        },
        placeholder: "Paste spreadsheet or comma, tab or pipe separated data here."
      }), parseError && React.createElement("div", {
        className: "level error"
      }, React.createElement("p", null, React.createElement("b", null, "Uh-oh!"), " We couldn't parse your data. Try pasting it in again?")), React.createElement("div", {
        className: "level nav"
      }, React.createElement("button", {
        onClick: this.startParsing,
        className: classnames('button', {
          'is-disabled': !value
        }),
        disabled: !value
      }, "Next"), parsing && React.createElement(FontAwesomeIcon, {
        icon: faCog,
        size: "lg",
        fixedWidth: true,
        spin: true,
        hidden: !parsing
      })));
    }
  }]);

  return TextInput;
}(React.Component);

TextInput.defaultProps = {
  defaultValue: ''
};

var styles$2 = {"component":"chartwerk_ui_components___3EpYOzTwU5"};

var styles$3 = {"component":"chartwerk_ui_components___18qm3Qf4SF"};

var datumWidth = 140;
var indexWidth = 35;
var datumCellWidth = {
  width: '140px'
};
var indexCellWidth = {
  width: '35px'
};

var styles$4 = {"component":"chartwerk_ui_components___1wLikxf3tB"};

var ColumnCell = function ColumnCell(props) {
  return React.createElement("div", {
    style: datumCellWidth,
    className: classnames('cell header', {
      number: props.isNumeric,
      'editing-column': props.transformColumn === props.column
    }),
    key: props.column,
    onClick: props.isNumeric ? function () {
      return props.setTransformColumn(props.column);
    } : null
  }, props.column, props.isNumeric && React.createElement(FontAwesomeIcon, {
    icon: faPencilAlt
  }));
};

var EmptyCell = function EmptyCell() {
  return React.createElement("div", {
    className: "cell",
    style: indexCellWidth
  });
};

var TypeCell = function TypeCell(props) {
  return React.createElement("div", {
    className: classnames('cell type', {
      editing: props.column === props.reTypeColumn
    }),
    style: datumCellWidth,
    onClick: function onClick() {
      return props.setReTypeColumn(props.column);
    }
  }, props.type === 'string' ? 'text' : props.type, React.createElement(FontAwesomeIcon, {
    icon: faPencilAlt
  }));
};

var Headers =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Headers, _React$Component);

  function Headers() {
    _classCallCheck(this, Headers);

    return _possibleConstructorReturn(this, _getPrototypeOf(Headers).apply(this, arguments));
  }

  _createClass(Headers, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          columns = _this$props.columns,
          columnTypes = _this$props.columnTypes,
          transformColumn = _this$props.transformColumn,
          setTransformColumn = _this$props.setTransformColumn,
          reTypeColumn = _this$props.reTypeColumn,
          setReTypeColumn = _this$props.setReTypeColumn;
      var Header = columns.map(function (column, i) {
        return React.createElement(ColumnCell, _extends({
          key: i,
          column: column,
          isNumeric: columnTypes[column] === 'number'
        }, {
          transformColumn: transformColumn,
          setTransformColumn: setTransformColumn
        }));
      });
      Header.unshift(React.createElement(EmptyCell, {
        key: 'empty'
      }));
      var HeaderTypes = columns.map(function (column, i) {
        return React.createElement(TypeCell, _extends({
          column: column,
          type: columnTypes[column],
          key: i
        }, {
          reTypeColumn: reTypeColumn,
          setReTypeColumn: setReTypeColumn
        }));
      });
      HeaderTypes.unshift(React.createElement(EmptyCell, {
        key: 'empty'
      }));
      return React.createElement("div", {
        className: classnames('header', styles$4.component)
      }, React.createElement("div", {
        className: "row"
      }, Header), React.createElement("div", {
        className: "row"
      }, HeaderTypes));
    }
  }]);

  return Headers;
}(React.Component);

var styles$5 = {"component":"chartwerk_ui_components___ihZRoQeq1_"};

var styles$6 = {"component":"chartwerk_ui_components___31rxNzRjNc"};

var isPositiveNumber = function isPositiveNumber(number) {
  if (typeof number !== 'number') return false;
  if (parseFloat(number) < 0) return false;
  return true;
};

var isString = function isString(string) {
  return typeof string === 'string';
};

var Transformer =
/*#__PURE__*/
function () {
  function Transformer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        operation = _ref.operation,
        multiplier = _ref.multiplier,
        rounding = _ref.rounding,
        precision = _ref.precision,
        prefix = _ref.prefix,
        suffix = _ref.suffix;

    _classCallCheck(this, Transformer);

    this.multiply = 'multiply';
    this.divide = 'divide';
    this.fixed = 'fixed point';
    this.digits = 'significant digits'; // Defaults

    this.operation = operation === this.multiply ? this.multiply : this.divide;
    this.multiplier = isPositiveNumber(multiplier) ? parseFloat(multiplier) : null;
    this.rounding = rounding === this.fixed ? this.fixed : this.digits;
    this.precision = isPositiveNumber(precision) ? parseInt(precision) : null;
    this.prefix = isString(prefix) ? prefix : '';
    this.suffix = isString(suffix) ? suffix : '';
  }

  _createClass(Transformer, [{
    key: "transform",
    value: function transform(d) {
      try {
        d = parseFloat(d);
      } catch (e) {
        return d;
      }

      var precisionFormat = this.rounding === this.fixed ? 'f' : 'r';
      var format$1 = this.precision !== null && this.precision >= 0 ? format(",.".concat(this.precision).concat(precisionFormat)) : format(',');
      if (this.operation === this.multiply && this.multiplier) d *= this.multiplier;
      if (this.operation === this.divide && this.multiplier) d *= 1 / this.multiplier;
      return "".concat(this.prefix).concat(format$1(d)).concat(this.suffix);
    }
  }]);

  return Transformer;
}();

var EditableCell =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EditableCell, _React$Component);

  function EditableCell(props) {
    var _this;

    _classCallCheck(this, EditableCell);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditableCell).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getType", function () {
      var _this$props = _this.props,
          columnTypes = _this$props.columnTypes,
          column = _this$props.column;
      return columnTypes[column];
    });

    _defineProperty(_assertThisInitialized(_this), "correctType", function () {
      var type = _this.getType();

      return type === 'string' ? 'text' : type;
    });

    _defineProperty(_assertThisInitialized(_this), "formatEditableCell", function (datum) {
      if (_this.getType() === 'number' && datum) return datum.toString();
      if (_this.getType() === 'date' && datum) return datum.toISOString().substring(0, 10);
      return datum;
    });

    _defineProperty(_assertThisInitialized(_this), "formatDisplayCell", function (datum) {
      if (!datum) return '';
      if (_this.getType() === 'number') return _this.applyTransforms(datum);
      if (_this.getType() === 'date') return datum.toLocaleDateString('en-US', {
        timeZone: 'UTC'
      });
      return datum;
    });

    _defineProperty(_assertThisInitialized(_this), "sendUpdate", function () {
      var _this$props2 = _this.props,
          column = _this$props2.column,
          rowIndex = _this$props2.rowIndex,
          update = _this$props2.update;

      var type = _this.correctType();

      update(type, rowIndex, column, _this.state.value);
    });

    _defineProperty(_assertThisInitialized(_this), "applyTransforms", function (value) {
      return _this.transformer.transform(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onEdit", function (_ref) {
      var target = _ref.target;

      _this.setState({
        value: target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyPress", function (e) {
      if (e.key !== 'Enter') return;

      _this.setState({
        editing: false
      });

      _this.sendUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      _this.setState({
        editing: false
      });

      _this.sendUpdate();
    });

    var row = props.row,
        _column = props.column;
    _this.state = {
      editing: false,
      value: _this.formatEditableCell(row[_column])
    };
    return _this;
  }

  _createClass(EditableCell, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          editing = _this$state.editing,
          value = _this$state.value;
      var _this$props3 = this.props,
          column = _this$props3.column,
          editingColumn = _this$props3.editingColumn,
          transforms = _this$props3.transforms,
          row = _this$props3.row;
      var type = this.correctType();
      var datum = row[column];
      this.transformer = new Transformer(transforms || {});
      return React.createElement("div", {
        style: datumCellWidth,
        className: classnames('cell', styles$6.component, {
          editing: editing,
          'editing-column': editingColumn
        }),
        onClick: function onClick(e) {
          return _this2.setState({
            editing: true
          });
        }
      }, editing && React.createElement("input", {
        className: classnames('editable', type),
        value: value,
        type: type,
        onChange: this.onEdit,
        onKeyPress: this.onKeyPress,
        onBlur: this.onBlur,
        autoFocus: true
      }), !editing && React.createElement("input", {
        className: type,
        value: this.formatDisplayCell(datum),
        type: 'text',
        readOnly: true
      }));
    }
  }]);

  return EditableCell;
}(React.Component);

var IndexCell = function IndexCell(props) {
  return React.createElement("div", {
    style: indexCellWidth,
    className: "cell index"
  }, props.index);
};

var Row =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Row, _React$PureComponent);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, _getPrototypeOf(Row).apply(this, arguments));
  }

  _createClass(Row, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          index = _this$props.index,
          style = _this$props.style,
          columnTypes = _this$props.columnTypes,
          columnTransforms = _this$props.columnTransforms,
          transformColumn = _this$props.transformColumn,
          update = _this$props.update;
      var columns = data.columns;
      var row = data[index];
      var cells = columns.map(function (column) {
        return React.createElement(EditableCell, {
          key: column + index,
          row: row,
          rowIndex: index,
          column: column,
          editingColumn: transformColumn === column,
          transformColumn: transformColumn,
          transforms: columnTransforms[column],
          update: update,
          columnTypes: columnTypes
        });
      });
      cells.unshift(React.createElement(IndexCell, {
        index: index + 1,
        key: index
      }));
      return React.createElement("div", {
        className: classnames('row', styles$5.component),
        style: style
      }, cells);
    }
  }]);

  return Row;
}(React.PureComponent);

var JsonTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JsonTable, _React$Component);

  function JsonTable() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, JsonTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(JsonTable)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "updatetypedData", function (type, row, column, value) {
      var _this$props = _this.props,
          typedData = _this$props.typedData,
          sendState = _this$props.sendState;
      typedData[row][column] = parseByType(value, type);
      sendState({
        typedData: typedData
      });
    });

    return _this;
  }

  _createClass(JsonTable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          typedData = _this$props2.typedData,
          columnTypes = _this$props2.columnTypes,
          columnTransforms = _this$props2.columnTransforms,
          transformColumn = _this$props2.transformColumn,
          setTransformColumn = _this$props2.setTransformColumn,
          reTypeColumn = _this$props2.reTypeColumn,
          setReTypeColumn = _this$props2.setReTypeColumn;
      var columns = typedData.columns;
      return React.createElement("div", {
        className: classnames(styles$3.component)
      }, React.createElement("div", {
        className: "table-footer"
      }), React.createElement("div", {
        className: "table-container"
      }, React.createElement("div", {
        className: "table is-fullwidth is-bordered"
      }, React.createElement(Headers, {
        columns: columns,
        columnTypes: columnTypes,
        transformColumn: transformColumn,
        setTransformColumn: setTransformColumn,
        reTypeColumn: reTypeColumn,
        setReTypeColumn: setReTypeColumn
      }), React.createElement(FixedSizeList, {
        itemData: typedData,
        height: 200,
        width: indexWidth + datumWidth * columns.length,
        itemCount: typedData.length,
        itemSize: 22,
        overscanCount: 10
      }, function (props) {
        return React.createElement(Row, _extends({
          columnTypes: columnTypes,
          columnTransforms: columnTransforms,
          transformColumn: transformColumn,
          update: _this2.updatetypedData
        }, props));
      }))));
    }
  }]);

  return JsonTable;
}(React.Component);

var styles$7 = {"component":"chartwerk_ui_components___1739ZqYURf","spinAround":"chartwerk_ui_components___2nyH7QKWHB"};

var styles$8 = {"component":"chartwerk_ui_components___2peR9z0_0s","spinAround":"chartwerk_ui_components___3g0n7Ap7Pr"};

var transformer = new Transformer();

var Multiply =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Multiply, _React$Component);

  function Multiply() {
    _classCallCheck(this, Multiply);

    return _possibleConstructorReturn(this, _getPrototypeOf(Multiply).apply(this, arguments));
  }

  _createClass(Multiply, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          operation = _this$props.operation,
          multiplier = _this$props.multiplier,
          update = _this$props.update;
      var currentOperation = operation || transformer.divide;
      var multiplying = currentOperation === transformer.multiply;
      return React.createElement("div", {
        className: "field-container"
      }, React.createElement("label", {
        className: "label"
      }, multiplying ? 'Multiply' : 'Divide'), React.createElement("div", {
        className: "field has-addons multiply"
      }, React.createElement("div", {
        className: "control"
      }, React.createElement("a", {
        className: "button",
        onClick: function onClick() {
          return update({
            operation: multiplying ? transformer.divide : transformer.multiply
          });
        }
      }, React.createElement(FontAwesomeIcon, {
        icon: multiplying ? faTimes : faDivide,
        fixedWidth: true
      }))), React.createElement("div", {
        className: "control"
      }, React.createElement("input", {
        className: "input",
        type: "number",
        min: "1",
        step: "1",
        placeholder: "-",
        value: multiplier || '',
        onChange: function onChange(_ref) {
          var target = _ref.target;
          return update({
            multiplier: parseFloat(target.value) || null,
            operation: multiplying ? transformer.multiply : transformer.divide
          });
        }
      }))));
    }
  }]);

  return Multiply;
}(React.Component);

var transformer$1 = new Transformer();

var Round =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Round, _React$Component);

  function Round() {
    _classCallCheck(this, Round);

    return _possibleConstructorReturn(this, _getPrototypeOf(Round).apply(this, arguments));
  }

  _createClass(Round, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          rounding = _this$props.rounding,
          precision = _this$props.precision,
          update = _this$props.update;
      var currentFormat = rounding || transformer$1.fixed;
      var fixed = currentFormat === transformer$1.fixed;
      return React.createElement("div", {
        className: "field-container"
      }, React.createElement("label", {
        className: "label"
      }, "Round"), React.createElement("div", {
        className: "field has-addons round"
      }, React.createElement("div", {
        className: "control"
      }, React.createElement("input", {
        className: "input",
        type: "number",
        min: "0",
        max: "100",
        step: "1",
        placeholder: "-",
        value: precision === 0 ? 0 : precision || '',
        onChange: function onChange(_ref) {
          var target = _ref.target;
          return update({
            rounding: fixed ? transformer$1.fixed : transformer$1.digits,
            precision: target.value === '0' ? 0.0 : parseFloat(target.value) || null
          });
        }
      })), React.createElement("div", {
        className: "control"
      }, React.createElement("a", {
        className: "button",
        onClick: function onClick() {
          return update({
            rounding: fixed ? transformer$1.digits : transformer$1.fixed
          });
        }
      }, fixed ? 'decimals' : 'sig. digits'))));
    }
  }]);

  return Round;
}(React.Component);

var Annotate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Annotate, _React$Component);

  function Annotate() {
    _classCallCheck(this, Annotate);

    return _possibleConstructorReturn(this, _getPrototypeOf(Annotate).apply(this, arguments));
  }

  _createClass(Annotate, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefix = _this$props.prefix,
          suffix = _this$props.suffix,
          update = _this$props.update;
      return React.createElement("div", {
        className: "field-container"
      }, React.createElement("label", {
        className: "label"
      }, "Prepend / Append"), React.createElement("div", {
        className: "field annotate"
      }, React.createElement("div", {
        className: "control"
      }, React.createElement("input", {
        className: "input left",
        type: "text",
        placeholder: "$...",
        value: prefix || '',
        onChange: function onChange(_ref) {
          var target = _ref.target;
          return update({
            prefix: target.value
          });
        }
      }), React.createElement("input", {
        className: "input right",
        type: "text",
        placeholder: "...%",
        value: suffix || '',
        onChange: function onChange(_ref2) {
          var target = _ref2.target;
          return update({
            suffix: target.value
          });
        }
      }))));
    }
  }]);

  return Annotate;
}(React.Component);

var Transform =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Transform, _React$Component);

  function Transform() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Transform);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Transform)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "update", function (updates) {
      var _this$props = _this.props,
          column = _this$props.column,
          transforms = _this$props.transforms,
          updateTransform = _this$props.updateTransform;
      updateTransform(column, Object.assign(transforms, updates));
    });

    return _this;
  }

  _createClass(Transform, [{
    key: "render",
    value: function render() {
      var transforms = this.props.transforms;
      var operation = transforms.operation,
          multiplier = transforms.multiplier,
          rounding = transforms.rounding,
          precision = transforms.precision,
          prefix = transforms.prefix,
          suffix = transforms.suffix;
      return React.createElement("div", {
        className: classnames(styles$8.component)
      }, React.createElement(Multiply, {
        operation: operation,
        multiplier: multiplier,
        update: this.update
      }), React.createElement(Round, {
        rounding: rounding,
        precision: precision,
        update: this.update
      }), React.createElement(Annotate, {
        prefix: prefix,
        suffix: suffix,
        update: this.update
      }));
    }
  }]);

  return Transform;
}(React.Component);

var Transforms =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Transforms, _React$Component);

  function Transforms() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Transforms);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Transforms)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "updateTransform", function (column, transforms) {
      var _this$props = _this.props,
          columnTransforms = _this$props.columnTransforms,
          sendState = _this$props.sendState;
      sendState({
        columnTransforms: Object.assign(columnTransforms, _defineProperty({}, column, transforms))
      });
    });

    return _this;
  }

  _createClass(Transforms, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          typedData = _this$props2.typedData,
          columnTransforms = _this$props2.columnTransforms,
          transformColumn = _this$props2.transformColumn;
      if (!transformColumn) return null;
      return React.createElement("div", {
        className: classnames(styles$7.component)
      }, React.createElement(Transform, {
        column: transformColumn,
        data: typedData[transformColumn],
        transforms: columnTransforms[transformColumn] || {},
        updateTransform: this.updateTransform
      }));
    }
  }]);

  return Transforms;
}(React.Component);

var styles$9 = {"component":"chartwerk_ui_components___3iiHp7Le4i","spinAround":"chartwerk_ui_components___3QzzPpMtr1"};

var ReType =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReType, _React$Component);

  function ReType() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ReType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ReType)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (_ref) {
      var target = _ref.target;
      var newType = target.value;
      var _this$props = _this.props,
          typedData = _this$props.typedData,
          stringData = _this$props.stringData,
          reTypeColumn = _this$props.reTypeColumn,
          sendState = _this$props.sendState,
          columnTypes = _this$props.columnTypes;
      var reTypedData = explicitlyTypeCollectionByColumn(typedData, stringData, reTypeColumn, newType);
      columnTypes[reTypeColumn] = newType;
      sendState({
        typedData: reTypedData,
        columnTypes: columnTypes
      });
    });

    return _this;
  }

  _createClass(ReType, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          reTypeColumn = _this$props2.reTypeColumn,
          columnTypes = _this$props2.columnTypes;
      if (!reTypeColumn) return null;
      var currentType = columnTypes[reTypeColumn];
      return React.createElement("div", {
        className: classnames(styles$9.component)
      }, React.createElement("div", {
        className: "field-container"
      }, React.createElement("h3", null, React.createElement(FontAwesomeIcon, {
        icon: faPencilAlt
      }), " ", reTypeColumn), React.createElement("div", {
        className: "control"
      }, React.createElement("label", {
        className: "radio"
      }, React.createElement("input", {
        type: "radio",
        value: "string",
        checked: currentType === 'string',
        onChange: this.onChange
      }), "text"), React.createElement("label", {
        className: "radio"
      }, React.createElement("input", {
        type: "radio",
        value: "number",
        checked: currentType === 'number',
        onChange: this.onChange
      }), "number"), React.createElement("label", {
        className: "radio"
      }, React.createElement("input", {
        type: "radio",
        value: "date",
        checked: currentType === 'date',
        onChange: this.onChange
      }), "date")), React.createElement("small", null, React.createElement("b", null, "Note:"), " If you convert a column to numbers or dates, any values that can't be parsed will be blank.")));
    }
  }]);

  return ReType;
}(React.Component);

var DataEdit =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DataEdit, _React$Component);

  function DataEdit() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataEdit);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataEdit)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      transformColumn: null,
      reTypeColumn: null
    });

    _defineProperty(_assertThisInitialized(_this), "setTransformColumn", function (column) {
      var transformColumn = _this.state.transformColumn;

      if (column === transformColumn) {
        _this.setState({
          transformColumn: null
        });
      } else {
        _this.setState({
          transformColumn: column,
          reTypeColumn: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setReTypeColumn", function (column) {
      var reTypeColumn = _this.state.reTypeColumn;

      if (column === reTypeColumn) {
        _this.setState({
          reTypeColumn: null
        });
      } else {
        _this.setState({
          reTypeColumn: column,
          transformColumn: null
        });
      }
    });

    return _this;
  }

  _createClass(DataEdit, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          transformColumn = _this$state.transformColumn,
          reTypeColumn = _this$state.reTypeColumn;
      var sendState = this.props.sendState;
      return React.createElement("div", {
        className: classnames(styles$2.component)
      }, React.createElement("div", {
        className: "message"
      }, React.createElement("p", null, "Here's how we parsed your data. You can edit values in the table.")), React.createElement(JsonTable, _extends({
        transformColumn: transformColumn,
        setTransformColumn: this.setTransformColumn,
        reTypeColumn: reTypeColumn,
        setReTypeColumn: this.setReTypeColumn
      }, this.props)), React.createElement(Transforms, _extends({
        transformColumn: transformColumn
      }, this.props)), React.createElement(ReType, _extends({
        reTypeColumn: reTypeColumn
      }, this.props)), React.createElement("div", {
        className: "level nav"
      }, React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          return sendState({
            view: INPUT
          });
        }
      }, "Back"), React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          return sendState({
            view: MAP
          });
        }
      }, "Next")));
    }
  }]);

  return DataEdit;
}(React.Component);

var styles$a = {"component":"chartwerk_ui_components___L_GTUyOt34"};

var styles$b = {"component":"chartwerk_ui_components___22ellApJCn","spinAround":"chartwerk_ui_components___1fzigblk4E"};

var Warning = function Warning(props) {
  return React.createElement("div", {
    className: "warning"
  }, React.createElement(FontAwesomeIcon, {
    icon: faTimes
  }), "Not enough ", props.prompt.type && React.createElement("span", {
    className: "monospace"
  }, props.prompt.type), " columns left");
};

var Map =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Map, _React$Component);

  function Map() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Map);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Map)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "addToMap", function (column) {
      var _this$props = _this.props,
          prompt = _this$props.prompt,
          dataMap = _this$props.dataMap,
          updateDataMap = _this$props.updateDataMap;
      var map = dataMap[prompt.key];

      if (prompt.members === 1) {
        updateDataMap(_defineProperty({}, prompt.key, column));
      } else {
        if (map) map.push(column);
        updateDataMap(_defineProperty({}, prompt.key, map || [column]));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "removeFromMap", function (column) {
      var _this$props2 = _this.props,
          prompt = _this$props2.prompt,
          dataMap = _this$props2.dataMap,
          updateDataMap = _this$props2.updateDataMap;
      var map = dataMap[prompt.key];

      if (prompt.members === 1) {
        updateDataMap(_defineProperty({}, prompt.key, null));
      } else {
        updateDataMap(_defineProperty({}, prompt.key, map.filter(function (c) {
          return c !== column;
        })));
      }
    });

    return _this;
  }

  _createClass(Map, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          prompt = _this$props3.prompt,
          availableColumns = _this$props3.availableColumns,
          columnTypes = _this$props3.columnTypes,
          isColumnMemberOfMap = _this$props3.isColumnMemberOfMap,
          isFull = _this$props3.isFull;
      var Columns = availableColumns.map(function (column) {
        var member = isColumnMemberOfMap(column, prompt.key);
        return React.createElement("div", {
          key: column,
          className: classnames('tag', columnTypes[column], {
            member: member,
            disabled: isFull && !member
          }),
          onClick: function onClick() {
            return member ? _this2.removeFromMap(column) : _this2.addToMap(column);
          }
        }, column);
      });
      return React.createElement("div", {
        className: classnames(styles$b.component)
      }, React.createElement("p", null, prompt.prompt), prompt.required && React.createElement("small", null, "( ", prompt.members ? prompt.members : null, " required )", React.createElement(FontAwesomeIcon, {
        icon: faCheck,
        hidden: !isFull
      })), React.createElement("div", {
        className: "tags"
      }, Columns.length >= prompt.members ? Columns : React.createElement(Warning, {
        prompt: prompt
      })));
    }
  }]);

  return Map;
}(React.Component);

var DataMap =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DataMap, _React$Component);

  function DataMap() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataMap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataMap)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "isColumnAvailable", function (column) {
      var dataMap = _this.props.dataMap;
      var available = true;
      Object.keys(dataMap).forEach(function (key) {
        var map = dataMap[key];
        if (!dataMap[key]) return;
        if (map === column) available = false;
        if (Array.isArray(map) && map.includes(column)) available = false;
      });
      return available;
    });

    _defineProperty(_assertThisInitialized(_this), "isColumnMemberOfMap", function (column, key) {
      var dataMap = _this.props.dataMap;
      if (!dataMap[key]) return false;
      var map = dataMap[key];
      if (map === column || map.includes(column)) return true;
      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "isMapFull", function (key) {
      var _this$props = _this.props,
          dataMap = _this$props.dataMap,
          prompts = _this$props.prompts;
      if (!dataMap[key]) return false;
      var prompt = prompts.filter(function (p) {
        return p.key === key;
      })[0];
      if (prompt.members === 0 || !prompt.members) return false;
      if (prompt.members === 1 && dataMap[key]) return true;
      if (prompt.members === dataMap[key].length) return true;
    });

    _defineProperty(_assertThisInitialized(_this), "isRequiredMapSatisfied", function (key) {
      var _this$props2 = _this.props,
          dataMap = _this$props2.dataMap,
          prompts = _this$props2.prompts;
      if (!dataMap[key]) return false;
      var prompt = prompts.filter(function (p) {
        return p.key === key;
      })[0];
      if ((prompt.members === 0 || !prompt.members) && dataMap[key].length > 0) return true;
      if (prompt.members === 1 && dataMap[key]) return true;
      if (prompt.members === dataMap[key].length) return true;
      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "areRequiredMapsSatistified", function () {
      var prompts = _this.props.prompts;
      var requirements = prompts.filter(function (p) {
        return p.required;
      }).map(function (p) {
        return _this.isRequiredMapSatisfied(p.key);
      });
      return !requirements.includes(false);
    });

    _defineProperty(_assertThisInitialized(_this), "getColumnsAvailableToPrompt", function (prompt) {
      var _this$props3 = _this.props,
          columns = _this$props3.columns,
          columnTypes = _this$props3.columnTypes;
      return columns.filter(function (column) {
        var columnType = columnTypes[column];
        if (prompt.type && columnType !== prompt.type) return false;
        if (!_this.isColumnAvailable(column) && !_this.isColumnMemberOfMap(column, prompt.key)) return false;
        return true;
      });
    });

    return _this;
  }

  _createClass(DataMap, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          prompts = _this$props4.prompts,
          columnTypes = _this$props4.columnTypes,
          dataMap = _this$props4.dataMap,
          updateDataMap = _this$props4.updateDataMap,
          sendState = _this$props4.sendState,
          updateContext = _this$props4.updateContext;
      var Maps = prompts.map(function (prompt) {
        return React.createElement(Map, {
          key: prompt.key,
          prompt: prompt,
          columnTypes: columnTypes,
          availableColumns: _this2.getColumnsAvailableToPrompt(prompt),
          isColumnMemberOfMap: _this2.isColumnMemberOfMap,
          isFull: _this2.isMapFull(prompt.key),
          map: dataMap[prompt.key],
          dataMap: dataMap,
          updateDataMap: updateDataMap
        });
      });
      return React.createElement("div", {
        className: classnames(styles$a.component)
      }, React.createElement("div", null, Maps), React.createElement("div", {
        className: "level nav"
      }, React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          return sendState({
            view: EDIT
          });
        }
      }, "Back"), React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          sendState({
            view: END
          });
          updateContext();
        },
        disabled: !this.areRequiredMapsSatistified()
      }, "Next")));
    }
  }]);

  return DataMap;
}(React.Component);

var styles$c = {"component":"chartwerk_ui_components___23fZebKi6n"};

var styles$d = {"component":"chartwerk_ui_components___3xdpn5KgWX"};

var Preview = function Preview(props) {
  var data = props.data;

  if (!data) {
    return null;
  }

  var previewRows = data.slice(0, 5);

  if (previewRows.length === 0) {
    return null;
  }

  var headers = keys(previewRows[0]);
  var truncatedRowCount = data.length - previewRows.length;
  console.log('headers', headers);
  console.log('previewRows', previewRows);
  console.log('truncatedRowCount', truncatedRowCount);
  return React.createElement("div", {
    className: styles$d.component + ' preview-container'
  }, React.createElement("table", {
    className: "table table-striped"
  }, React.createElement("thead", null, React.createElement("tr", null, headers.map(function (d) {
    return React.createElement("th", {
      key: d
    }, d);
  }))), React.createElement("tbody", null, previewRows.map(function (tr) {
    return React.createElement("tr", null, keys(tr).map(function (k) {
      return React.createElement("td", null, tr[k]);
    }));
  }), React.createElement("tr", null, React.createElement("td", {
    colSpan: headers.length
  }, "And ", truncatedRowCount, " similiar rows.")))));
};

var Finale =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Finale, _React$Component);

  function Finale() {
    _classCallCheck(this, Finale);

    return _possibleConstructorReturn(this, _getPrototypeOf(Finale).apply(this, arguments));
  }

  _createClass(Finale, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          sendState = _this$props.sendState,
          stringData = _this$props.stringData;
      return React.createElement("div", {
        className: classnames(styles$c.component)
      }, React.createElement("div", {
        className: "level nav"
      }, React.createElement(Preview, {
        data: stringData
      }), React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          return sendState({
            view: EDIT
          });
        }
      }, "Re-edit data")));
    }
  }]);

  return Finale;
}(React.Component);

var Data =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Data, _React$Component);

  function Data() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Data);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Data)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      view: INPUT,
      rawData: '',
      stringData: undefined,
      typedData: undefined,
      columnTypes: {},
      columnTransforms: {},
      dataMap: {}
    });

    _defineProperty(_assertThisInitialized(_this), "sendState", function (newState) {
      return _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "updateDataMap", function (newMap) {
      return _this.setState(function (state) {
        return {
          dataMap: Object.assign(state.dataMap, newMap)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateContext", function () {
      var _this$state = _this.state,
          data = _this$state.typedData,
          columnTypes = _this$state.columnTypes,
          columnTransforms = _this$state.columnTransforms,
          dataMap = _this$state.dataMap;
      var transformers = {};
      Object.keys(columnTransforms).forEach(function (column) {
        transformers[column] = new Transformer(columnTransforms[column]);
      });

      _this.props.updateData({
        data: data,
        dataMap: dataMap,
        columnTypes: columnTypes,
        transformers: transformers
      });
    });

    return _this;
  }

  _createClass(Data, [{
    key: "render",
    value: function render() {
      var dataMapPrompts = this.props.dataMapPrompts;
      var _this$state2 = this.state,
          view = _this$state2.view,
          typedData = _this$state2.typedData,
          stringData = _this$state2.stringData,
          columnTypes = _this$state2.columnTypes,
          rawData = _this$state2.rawData,
          columnTransforms = _this$state2.columnTransforms,
          dataMap = _this$state2.dataMap;
      return React.createElement("div", {
        className: classnames(styles.component)
      }, view === INPUT && React.createElement(TextInput, {
        defaultValue: rawData,
        sendState: this.sendState
      }), view === EDIT && React.createElement(DataEdit, {
        typedData: typedData,
        stringData: stringData,
        columnTypes: columnTypes,
        columnTransforms: columnTransforms,
        sendState: this.sendState
      }), view === MAP && React.createElement(DataMap, {
        prompts: dataMapPrompts,
        columns: typedData.columns,
        columnTypes: columnTypes,
        dataMap: dataMap,
        updateDataMap: this.updateDataMap,
        sendState: this.sendState,
        updateContext: this.updateContext
      }), view === END && React.createElement(Finale, {
        stringData: stringData,
        sendState: this.sendState
      }));
    }
  }]);

  return Data;
}(React.Component);

Data.defaultProps = {};

export default Data;
