import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
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
import zipWith from 'lodash/zipWith';
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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var styles = {"component":"chartwerk_ui_components___2cqd8bK7hI","spinAround":"chartwerk_ui_components___FNc774so1i"};

var INPUT = 'input';
var EDIT = 'edit';
var MAP = 'map';
var PREVIEW = 'preview';

/**
 * A helper to parse dates back from their stringified representation in JSON.
 * Used to transform the data prop that seeds state when first initializing
 * the Data component.
 * @param {Object} data The props that seeds Data state.
 */
var parseDates = function parseDates(dataState) {
  var columns = dataState.columns;
  var dateColumns = Object.keys(columns).filter(function (c) {
    return columns[c].type === 'date';
  });
  dataState.data.forEach(function (d) {
    dateColumns.forEach(function (c) {
      d[c].parsed = new Date(d[c].parsed);
    });
  });
  return dataState;
};

var styles$1 = {"component":"chartwerk_ui_components___Hsz0o0s8Dh"};

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

var zipDataCollections = function zipDataCollections(stringData, parsedData) {
  return zipWith(stringData, parsedData, function (stringObj, parsedObj) {
    var datum = {};
    Object.keys(stringObj).forEach(function (key) {
      datum[key] = {
        raw: stringObj[key],
        parsed: parsedObj[key]
      };
    });
    return datum;
  });
};
var unzipDataCollections = function unzipDataCollections(data) {
  var stringData = data.map(function (d) {
    var datum = {};
    Object.keys(d).forEach(function (key) {
      datum[key] = d[key].raw;
    });
    return datum;
  });
  var parsedData = data.map(function (d) {
    var datum = {};
    Object.keys(d).forEach(function (key) {
      datum[key] = d[key].parsed;
    });
    return datum;
  });
  return [stringData, parsedData];
};

var Input =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    var _this;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, props));

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
      var parsedData = parseToTypes(_this.state.value);

      if (!parsedData) {
        _this.setState({
          parseError: true,
          parsing: false
        });

        return;
      }

      var columns = {};
      var columnsArray = parsedData.columns.slice();
      columnsArray.forEach(function (column, i) {
        var _parseMajorityType = parseMajorityType(parsedData.map(function (obj) {
          return obj[column];
        })),
            majorityType = _parseMajorityType.majorityType,
            unanimous = _parseMajorityType.unanimous;

        columns[column] = {
          order: i,
          type: majorityType
        };

        if (!unanimous) {
          parsedData = explicitlyTypeCollectionByColumn(parsedData, stringData, column, majorityType);
        }
      });
      var data = zipDataCollections(stringData, parsedData);
      sendState({
        data: data,
        columns: columns,
        blob: _this.state.value,
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

  _createClass(Input, [{
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

  return Input;
}(React.Component);

Input.defaultProps = {
  defaultValue: ''
};
Input.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  sendState: PropTypes.func.isRequired
};

var styles$2 = {"component":"chartwerk_ui_components___2X8B4iz3dp"};

var styles$3 = {"component":"chartwerk_ui_components___2tNjOiYN5j"};

var isPositiveNumber = function isPositiveNumber(number) {
  if (typeof number !== 'number') return false;
  if (parseFloat(number) < 0) return false;
  return true;
};
var isString = function isString(string) {
  return typeof string === 'string';
};

var FIXED = 'fixed point';
var DIGITS = 'significant digits';

var Annotator =
/*#__PURE__*/
function () {
  function Annotator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        rounding = _ref.rounding,
        precision = _ref.precision,
        prefix = _ref.prefix,
        suffix = _ref.suffix;

    _classCallCheck(this, Annotator);

    _defineProperty(this, "fixed", FIXED);

    _defineProperty(this, "digits", DIGITS);

    this.rounding = rounding === FIXED ? FIXED : DIGITS;
    this.precision = isPositiveNumber(precision) ? parseInt(precision) : null;
    this.prefix = isString(prefix) ? prefix : '';
    this.suffix = isString(suffix) ? suffix : '';
  }

  _createClass(Annotator, [{
    key: "annotate",
    value: function annotate(d) {
      try {
        d = parseFloat(d);
      } catch (e) {
        return d;
      } // Currency prefix is handled as a special case by d3.format
      // so we get "-$5" not "$-5".
      // Positive prefix is also handled by d3.format.


      var prefix = ['$', '+', '+$'].includes(this.prefix) ? '' : this.prefix;
      return "".concat(prefix).concat(this.format(d)).concat(this.suffix);
    }
  }, {
    key: "formatString",
    get: function get() {
      var precisionFormat = this.rounding === FIXED ? 'f' : 'r';
      var format = this.precision !== null && this.precision >= 0 ? ",.".concat(this.precision).concat(precisionFormat) : ','; // Add to format string if currency or positive sign is prefix

      var formatPrefix = ['$', '+', '+$'].includes(this.prefix) ? this.prefix : '';
      return formatPrefix + format;
    }
  }, {
    key: "format",
    get: function get() {
      return format(this.formatString);
    }
  }]);

  return Annotator;
}();

var MULTIPLY = 'multiply';
var DIVIDE = 'divide';

var Transformer =
/*#__PURE__*/
function () {
  function Transformer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        operation = _ref.operation,
        multiplier = _ref.multiplier;

    _classCallCheck(this, Transformer);

    _defineProperty(this, "multiply", MULTIPLY);

    _defineProperty(this, "divide", DIVIDE);

    this.operation = operation === MULTIPLY ? MULTIPLY : DIVIDE;
    this.multiplier = isPositiveNumber(multiplier) ? parseFloat(multiplier) : null;
  }

  _createClass(Transformer, [{
    key: "transform",
    value: function transform(d) {
      try {
        d = parseFloat(d);
      } catch (e) {
        return d;
      }

      if (!this.multiplier) return d;
      if (this.operation === MULTIPLY) d *= this.multiplier;
      if (this.operation === DIVIDE) d *= 1 / this.multiplier;
      return d;
    }
  }]);

  return Transformer;
}();

var datumWidth = 145;
var indexWidth = 35;
var datumCellWidth = {
  width: "".concat(datumWidth, "px")
};
var indexCellWidth = {
  width: "".concat(indexWidth, "px")
};

var styles$4 = {"component":"chartwerk_ui_components___2KmMU7PtV6"};

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
          transformColumn = _this$props.transformColumn,
          setTransformColumn = _this$props.setTransformColumn,
          reTypeColumn = _this$props.reTypeColumn,
          setReTypeColumn = _this$props.setReTypeColumn;
      var orderedColumns = Object.keys(columns).sort(function (a, b) {
        return columns[a].order - columns[b].order;
      });
      var Header = orderedColumns.map(function (column, i) {
        return React.createElement(ColumnCell, _extends({
          key: i,
          column: column,
          isNumeric: columns[column].type === 'number'
        }, {
          transformColumn: transformColumn,
          setTransformColumn: setTransformColumn
        }));
      });
      Header.unshift(React.createElement(EmptyCell, {
        key: "empty"
      }));
      var HeaderTypes = orderedColumns.map(function (column, i) {
        return React.createElement(TypeCell, _extends({
          column: column,
          type: columns[column].type,
          key: i
        }, {
          reTypeColumn: reTypeColumn,
          setReTypeColumn: setReTypeColumn
        }));
      });
      HeaderTypes.unshift(React.createElement(EmptyCell, {
        key: "empty"
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

var styles$5 = {"component":"chartwerk_ui_components___18XMcmtgFf"};

var styles$6 = {"component":"chartwerk_ui_components___16FpMFvss8"};

var EditableCell =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(EditableCell, _React$PureComponent);

  function EditableCell(props) {
    var _this;

    _classCallCheck(this, EditableCell);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditableCell).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getType", function () {
      return _this.props.column.type;
    });

    _defineProperty(_assertThisInitialized(_this), "correctType", function () {
      var type = _this.props.column.type;
      return type === 'string' ? 'text' : type;
    });

    _defineProperty(_assertThisInitialized(_this), "formatEditableCell", function (datum) {
      var type = _this.props.column.type;
      if (type === 'number' && datum) return datum.toString();
      if (type === 'date' && datum) return datum.toISOString().substring(0, 10);
      return datum;
    });

    _defineProperty(_assertThisInitialized(_this), "formatDisplayCell", function (datum) {
      if (!datum.parsed) return '';
      var type = _this.props.column.type;

      if (type === 'number') {
        return datum.annotated || datum.transformed || datum.parsed;
      }
      if (type === 'date') return datum.parsed.toLocaleDateString('en-US', {
        timeZone: 'UTC'
      });
      return datum.parsed;
    });

    _defineProperty(_assertThisInitialized(_this), "sendUpdate", function () {
      var _this$props = _this.props,
          columnKey = _this$props.columnKey,
          rowIndex = _this$props.rowIndex,
          update = _this$props.update;

      var type = _this.correctType();

      update(type, rowIndex, columnKey, _this.state.value);
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
        _columnKey = props.columnKey;
    _this.state = {
      editing: false,
      value: _this.formatEditableCell(row[_columnKey].parsed)
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
      var _this$props2 = this.props,
          columnKey = _this$props2.columnKey,
          editingColumn = _this$props2.editingColumn,
          row = _this$props2.row;
      var type = this.correctType();
      var datum = row[columnKey];
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
        type: "text",
        readOnly: true
      }));
    }
  }]);

  return EditableCell;
}(React.PureComponent);

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
          columns = _this$props.columns,
          transformColumn = _this$props.transformColumn,
          update = _this$props.update;
      var orderedColumns = Object.keys(columns).sort(function (a, b) {
        return columns[a].order - columns[b].order;
      });
      var row = data[index];
      var cells = orderedColumns.map(function (columnKey) {
        return React.createElement(EditableCell, {
          key: columnKey + index,
          row: row,
          rowIndex: index,
          column: columns[columnKey],
          columnKey: columnKey,
          editingColumn: transformColumn === columnKey,
          transformColumn: transformColumn,
          update: update
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

var Table =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Table)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "updateData", function (type, row, column, value) {
      var _this$props = _this.props,
          data = _this$props.data,
          columns = _this$props.columns,
          sendState = _this$props.sendState;
      var datum = data[row][column]; // Parse value

      var parsedValue = parseByType(value, type);
      datum.parsed = parsedValue; // Re-run transforms and annotations, if needed

      var _columns$column = columns[column],
          transform = _columns$column.transform,
          annotations = _columns$column.annotations;
      var T, A;

      if (datum.transformed) {
        T = new Transformer(transform);
        datum.transformed = T.transform(parsedValue);
      }

      if (datum.annotated) {
        A = new Annotator(annotations);
        datum.annotated = A.annotate(datum.transformed || parsedValue);
      }

      sendState({
        data: data
      });
    });

    return _this;
  }

  _createClass(Table, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          data = _this$props2.data,
          columns = _this$props2.columns,
          transformColumn = _this$props2.transformColumn,
          setTransformColumn = _this$props2.setTransformColumn,
          reTypeColumn = _this$props2.reTypeColumn,
          setReTypeColumn = _this$props2.setReTypeColumn;
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
        transformColumn: transformColumn,
        setTransformColumn: setTransformColumn,
        reTypeColumn: reTypeColumn,
        setReTypeColumn: setReTypeColumn
      }), React.createElement(FixedSizeList, {
        itemData: data,
        height: 200,
        width: indexWidth + datumWidth * Object.keys(columns).length + 15,
        itemCount: data.length,
        itemSize: 22,
        overscanCount: 10
      }, function (props) {
        return React.createElement(Row, _extends({
          columns: columns,
          transformColumn: transformColumn,
          update: _this2.updateData
        }, props));
      }))));
    }
  }]);

  return Table;
}(React.Component);

var styles$7 = {"component":"chartwerk_ui_components___m7nuPQ3NIt","spinAround":"chartwerk_ui_components___2HG7QYqctC"};

var styles$8 = {"component":"chartwerk_ui_components___2ea2SZEwIv","spinAround":"chartwerk_ui_components___Sn06hWL_Fa"};

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
      var currentOperation = operation || DIVIDE;
      var multiplying = currentOperation === MULTIPLY;
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
            operation: multiplying ? DIVIDE : MULTIPLY
          });
        },
        disabled: !multiplier
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
            operation: multiplying ? MULTIPLY : DIVIDE
          });
        }
      }))));
    }
  }]);

  return Multiply;
}(React.Component);

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
      var currentFormat = rounding || FIXED;
      var fixed = currentFormat === FIXED;
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
            rounding: fixed ? FIXED : DIGITS,
            precision: target.value === '0' ? 0.0 : parseFloat(target.value) || null
          });
        }
      })), React.createElement("div", {
        className: "control"
      }, React.createElement("a", {
        className: "button",
        onClick: function onClick() {
          return update({
            rounding: fixed ? DIGITS : FIXED
          });
        },
        disabled: !precision
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

    _defineProperty(_assertThisInitialized(_this), "updateTransform", function (updates) {
      var _this$props = _this.props,
          columnKey = _this$props.columnKey,
          transform = _this$props.transform,
          updateTransform = _this$props.updateTransform;
      updateTransform(columnKey, Object.assign(transform, updates));
    });

    _defineProperty(_assertThisInitialized(_this), "updateAnnotations", function (updates) {
      var _this$props2 = _this.props,
          columnKey = _this$props2.columnKey,
          annotations = _this$props2.annotations,
          updateAnnotations = _this$props2.updateAnnotations;
      updateAnnotations(columnKey, Object.assign(annotations, updates));
    });

    return _this;
  }

  _createClass(Transform, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          transform = _this$props3.transform,
          annotations = _this$props3.annotations;
      var operation = transform.operation,
          multiplier = transform.multiplier;
      var rounding = annotations.rounding,
          precision = annotations.precision,
          prefix = annotations.prefix,
          suffix = annotations.suffix;
      return React.createElement("div", {
        className: classnames(styles$8.component)
      }, React.createElement(Multiply, {
        operation: operation,
        multiplier: multiplier,
        update: this.updateTransform
      }), React.createElement(Round, {
        rounding: rounding,
        precision: precision,
        update: this.updateAnnotations
      }), React.createElement(Annotate, {
        prefix: prefix,
        suffix: suffix,
        update: this.updateAnnotations
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

    _defineProperty(_assertThisInitialized(_this), "isTransformNull", function (transform) {
      return !transform || !transform.multiplier;
    });

    _defineProperty(_assertThisInitialized(_this), "isAnnotationNull", function (annotations) {
      return !annotations || !annotations.prefix && !annotations.suffix && !annotations.precision;
    });

    _defineProperty(_assertThisInitialized(_this), "transformData", function (transform) {
      var _this$props = _this.props,
          data = _this$props.data,
          column = _this$props.transformColumn;
      var newData = data.slice();

      if (_this.isTransformNull(transform)) {
        newData.forEach(function (d) {
          delete d[column].transformed;
        });
        return newData;
      }

      var T = new Transformer(_objectSpread2({}, transform));
      newData.forEach(function (d) {
        d[column].transformed = T.transform(d[column].parsed);
      });
      return newData;
    });

    _defineProperty(_assertThisInitialized(_this), "annotateData", function (annotations, transform) {
      var column = _this.props.transformColumn;

      var newData = _this.transformData(transform);

      if (_this.isAnnotationNull(annotations)) {
        newData.forEach(function (d) {
          delete d[column].annotated;
        });
        return newData;
      }

      var A = new Annotator(_objectSpread2({}, annotations));
      newData.forEach(function (d) {
        d[column].annotated = A.annotate(d[column].transformed || d[column].parsed);
      });
      return newData;
    });

    _defineProperty(_assertThisInitialized(_this), "updateTransform", function (column, transform) {
      var _this$props2 = _this.props,
          columns = _this$props2.columns,
          sendState = _this$props2.sendState;
      var annotations = columns[column].annotations;
      var newColumns = Object.assign({}, columns);
      newColumns[column].transform = transform; // Delete if null

      if (_this.isTransformNull(transform)) delete newColumns[column].transform;
      sendState({
        columns: newColumns,
        data: _this.annotateData(annotations, transform)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateAnnotations", function (column, annotations) {
      var _this$props3 = _this.props,
          columns = _this$props3.columns,
          sendState = _this$props3.sendState;
      var transform = columns[column].transform;
      var newColumns = Object.assign({}, columns);
      newColumns[column].annotations = annotations; // Delete if nulls

      if (_this.isAnnotationNull(annotations)) delete newColumns[column].annotations;
      sendState({
        columns: newColumns,
        data: _this.annotateData(annotations, transform)
      });
    });

    return _this;
  }

  _createClass(Transforms, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          data = _this$props4.data,
          columns = _this$props4.columns,
          transformColumn = _this$props4.transformColumn;
      if (!transformColumn) return null;
      return React.createElement("div", {
        className: classnames(styles$7.component)
      }, React.createElement(Transform, {
        columnKey: transformColumn,
        data: data,
        transform: columns[transformColumn].transform || {},
        updateTransform: this.updateTransform,
        annotations: columns[transformColumn].annotations || {},
        updateAnnotations: this.updateAnnotations
      }));
    }
  }]);

  return Transforms;
}(React.Component);

var styles$9 = {"component":"chartwerk_ui_components___tzZL-K6tZP","spinAround":"chartwerk_ui_components___1CkecKiYGn"};

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
          data = _this$props.data,
          columns = _this$props.columns,
          reTypeColumn = _this$props.reTypeColumn,
          sendState = _this$props.sendState;

      var _unzipDataCollections = unzipDataCollections(data),
          _unzipDataCollections2 = _slicedToArray(_unzipDataCollections, 2),
          stringData = _unzipDataCollections2[0],
          typedData = _unzipDataCollections2[1];

      var reTypedData = explicitlyTypeCollectionByColumn(typedData, stringData, reTypeColumn, newType);
      columns[reTypeColumn].type = newType; // Always delete numeric format config on a retype

      delete columns[reTypeColumn].transform;
      delete columns[reTypeColumn].annotations;
      sendState({
        data: zipDataCollections(stringData, reTypedData),
        columns: columns
      });
    });

    return _this;
  }

  _createClass(ReType, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          reTypeColumn = _this$props2.reTypeColumn,
          columns = _this$props2.columns;
      if (!reTypeColumn) return null;
      var currentType = columns[reTypeColumn].type;
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

var Edit =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Edit, _React$Component);

  function Edit() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Edit);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Edit)).call.apply(_getPrototypeOf2, [this].concat(args)));

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

  _createClass(Edit, [{
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
      }, React.createElement("p", null, "Here's how we parsed your data. You can edit values in the table and format or re-type columns by clicking a header.")), React.createElement(Table, _extends({
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
      }, "New data"), React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          return sendState({
            view: MAP
          });
        }
      }, "Next")));
    }
  }]);

  return Edit;
}(React.Component);

Edit.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

var styles$a = {"component":"chartwerk_ui_components___2kr6xD-KDP"};

var styles$b = {"component":"chartwerk_ui_components___3sSvXmFKQ8","spinAround":"chartwerk_ui_components___1w_35t5PrZ"};

var Warning = function Warning(props) {
  return React.createElement("div", {
    className: "warning"
  }, React.createElement(FontAwesomeIcon, {
    icon: faTimes
  }), "Not enough ", props.prompt.type && React.createElement("span", {
    className: "monospace"
  }, props.prompt.type), " columns left");
};

var Prompt =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Prompt, _React$Component);

  function Prompt() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Prompt);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Prompt)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "addToMapping", function (column) {
      var _this$props = _this.props,
          prompt = _this$props.prompt,
          map = _this$props.map,
          updateMap = _this$props.updateMap;
      var mapping = map[prompt.key];

      if (prompt.members === 1) {
        updateMap(_defineProperty({}, prompt.key, column));
      } else {
        if (mapping) mapping.push(column);
        updateMap(_defineProperty({}, prompt.key, mapping || [column]));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "removeFromMapping", function (column) {
      var _this$props2 = _this.props,
          prompt = _this$props2.prompt,
          map = _this$props2.map,
          updateMap = _this$props2.updateMap;
      var mapping = map[prompt.key];

      if (prompt.members === 1) {
        updateMap(_defineProperty({}, prompt.key, null));
      } else {
        updateMap(_defineProperty({}, prompt.key, mapping.filter(function (c) {
          return c !== column;
        })));
      }
    });

    return _this;
  }

  _createClass(Prompt, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          prompt = _this$props3.prompt,
          availableColumns = _this$props3.availableColumns,
          columns = _this$props3.columns,
          isColumnMemberOfMap = _this$props3.isColumnMemberOfMap,
          isFull = _this$props3.isFull;
      var Columns = availableColumns.map(function (column) {
        var member = isColumnMemberOfMap(column, prompt.key);
        return React.createElement("div", {
          key: column,
          className: classnames('tag', columns[column].type, {
            member: member,
            disabled: isFull && !member
          }),
          onClick: function onClick() {
            return member ? _this2.removeFromMapping(column) : _this2.addToMapping(column);
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

  return Prompt;
}(React.Component);

Prompt.propTypes = {
  prompt: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  availableColumns: PropTypes.array.isRequired,
  isColumnMemberOfMap: PropTypes.func.isRequired,
  isFull: PropTypes.bool,
  map: PropTypes.object.isRequired,
  updateMap: PropTypes.func.isRequired
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

    _defineProperty(_assertThisInitialized(_this), "isColumnAvailable", function (column) {
      var map = _this.props.map;
      var available = true;
      Object.keys(map).forEach(function (key) {
        var mapping = map[key];
        if (!mapping) return;
        if (mapping === column) available = false;
        if (Array.isArray(mapping) && mapping.includes(column)) available = false;
      });
      return available;
    });

    _defineProperty(_assertThisInitialized(_this), "isColumnMemberOfMap", function (column, key) {
      var map = _this.props.map;
      var mapping = map[key];
      if (!mapping) return false;
      if (mapping === column || mapping.includes(column)) return true;
      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "isMapFull", function (key) {
      var _this$props = _this.props,
          map = _this$props.map,
          prompts = _this$props.prompts;
      var mapping = map[key];
      if (!mapping) return false;
      var prompt = prompts.filter(function (p) {
        return p.key === key;
      })[0];
      if (prompt.members === 0 || !prompt.members) return false;
      if (prompt.members === 1 && mapping) return true;
      if (prompt.members === mapping.length) return true;
    });

    _defineProperty(_assertThisInitialized(_this), "isRequiredMapSatisfied", function (key) {
      var _this$props2 = _this.props,
          map = _this$props2.map,
          prompts = _this$props2.prompts;
      var mapping = map[key];
      if (!mapping) return false;
      var prompt = prompts.filter(function (p) {
        return p.key === key;
      })[0];
      if ((prompt.members === 0 || !prompt.members) && mapping.length > 0) return true;
      if (prompt.members === 1 && mapping) return true;
      if (prompt.members === mapping.length) return true;
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
      var columns = _this.props.columns;
      var orderedColumns = Object.keys(columns).sort(function (a, b) {
        return columns[a].order - columns[b].order;
      });
      return orderedColumns.filter(function (column) {
        var columnType = columns[column].type;
        if (prompt.type && columnType !== prompt.type) return false;
        if (!_this.isColumnAvailable(column) && !_this.isColumnMemberOfMap(column, prompt.key)) return false;
        return true;
      });
    });

    return _this;
  }

  _createClass(Map, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          prompts = _this$props3.prompts,
          columns = _this$props3.columns,
          map = _this$props3.map,
          updateMap = _this$props3.updateMap,
          sendState = _this$props3.sendState,
          updateContext = _this$props3.updateContext;
      var Prompts = prompts.map(function (prompt) {
        return React.createElement(Prompt, {
          key: prompt.key,
          prompt: prompt,
          columns: columns,
          availableColumns: _this2.getColumnsAvailableToPrompt(prompt),
          isColumnMemberOfMap: _this2.isColumnMemberOfMap,
          isFull: _this2.isMapFull(prompt.key),
          map: map,
          updateMap: updateMap
        });
      });
      return React.createElement("div", {
        className: classnames(styles$a.component)
      }, React.createElement("div", null, Prompts), React.createElement("div", {
        className: "level nav"
      }, React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          return sendState({
            view: EDIT
          });
        }
      }, "Edit data"), React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          sendState({
            view: PREVIEW
          });
          updateContext();
        },
        disabled: !this.areRequiredMapsSatistified()
      }, "Next")));
    }
  }]);

  return Map;
}(React.Component);

Map.propTypes = {
  map: PropTypes.object.isRequired,
  updateMap: PropTypes.func.isRequired,
  prompts: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  sendState: PropTypes.func.isRequired,
  updateContext: PropTypes.func.isRequired
};

var styles$c = {"component":"chartwerk_ui_components___1sddTG5Ptd"};

var styles$d = {"component":"chartwerk_ui_components___yo7UjV4T3z","spinAround":"chartwerk_ui_components___17i8pG_5aB"};

var Table$1 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Table)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "formatDisplayCell", function (columnType, datum) {
      if (!datum) return '';

      if (columnType === 'number') {
        return datum.annotated || datum.transformed || datum.parsed;
      }
      if (columnType === 'date') return datum.parsed.toLocaleDateString('en-US', {
        timeZone: 'UTC'
      });
      return datum.parsed;
    });

    return _this;
  }

  _createClass(Table, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          data = _this$props.data,
          columns = _this$props.columns;

      if (!data) {
        return null;
      }

      var previewRows = data.slice(0, 5);

      if (previewRows.length === 0) {
        return null;
      }

      var headers = keys(previewRows[0]).sort(function (a, b) {
        return columns[a].order - columns[b].order;
      });
      var truncatedRowCount = data.length - previewRows.length;
      return React.createElement("div", {
        className: classnames(styles$d.component, 'preview-container')
      }, React.createElement("div", {
        className: "table-footer"
      }), React.createElement("table", {
        className: "table preview"
      }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
        className: "cell index"
      }), headers.map(function (d) {
        return React.createElement("th", {
          key: d
        }, d);
      }))), React.createElement("tbody", null, previewRows.map(function (row, i) {
        return React.createElement("tr", {
          key: i
        }, React.createElement("td", {
          className: "cell index"
        }, i + 1), headers.map(function (column, i) {
          return React.createElement("td", {
            className: classnames('cell', columns[column].type),
            key: i
          }, _this2.formatDisplayCell(columns[column].type, row[column]));
        }));
      }))), React.createElement("small", null, "... and ", truncatedRowCount, " similiar rows."));
    }
  }]);

  return Table;
}(React.Component);

var Preview =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Preview, _React$Component);

  function Preview() {
    _classCallCheck(this, Preview);

    return _possibleConstructorReturn(this, _getPrototypeOf(Preview).apply(this, arguments));
  }

  _createClass(Preview, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          sendState = _this$props.sendState,
          data = _this$props.data,
          columns = _this$props.columns;
      return React.createElement("div", {
        className: classnames(styles$c.component)
      }, React.createElement("div", {
        className: "level nav"
      }, React.createElement(Table$1, {
        data: data,
        columns: columns
      }), React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          return sendState({
            view: EDIT
          });
        }
      }, "Edit data"), React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          return sendState({
            view: INPUT
          });
        }
      }, "New data")));
    }
  }]);

  return Preview;
}(React.Component);

Preview.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  sendState: PropTypes.func.isRequired
};

var Data =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Data, _React$Component);

  function Data(props) {
    var _this;

    _classCallCheck(this, Data);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Data).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "sendState", function (newState) {
      return _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "updateMap", function (newMap) {
      return _this.setState(function (state) {
        return {
          map: Object.assign(state.map, newMap)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateContext", function () {
      var _this$state = _this.state,
          blob = _this$state.blob,
          data = _this$state.data,
          columns = _this$state.columns,
          map = _this$state.map;

      _this.props.updateData({
        blob: blob,
        data: data,
        columns: columns,
        map: map
      });
    });

    var view = props.data.data.length > 0 ? PREVIEW : INPUT;
    _this.state = Object.assign({
      view: view
    }, parseDates(props.data));
    return _this;
  }

  _createClass(Data, [{
    key: "render",
    value: function render() {
      var mapPrompts = this.props.mapPrompts;
      var _this$state2 = this.state,
          view = _this$state2.view,
          blob = _this$state2.blob,
          data = _this$state2.data,
          columns = _this$state2.columns,
          map = _this$state2.map;
      return React.createElement("div", {
        className: classnames(styles.component)
      }, view === INPUT && React.createElement(Input, {
        defaultValue: blob,
        sendState: this.sendState
      }), view === EDIT && React.createElement(Edit, {
        data: data,
        columns: columns,
        sendState: this.sendState
      }), view === MAP && React.createElement(Map, {
        map: map,
        updateMap: this.updateMap,
        prompts: mapPrompts,
        columns: columns,
        sendState: this.sendState,
        updateContext: this.updateContext
      }), view === PREVIEW && React.createElement(Preview, {
        data: data,
        columns: columns,
        sendState: this.sendState
      }));
    }
  }]);

  return Data;
}(React.Component);

Data.defaultProps = {
  data: {
    view: INPUT,
    blob: '',
    data: [],
    columns: {},
    map: {}
  }
};
Data.propTypes = {
  data: PropTypes.shape({
    view: PropTypes.string.isRequried,
    blob: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired,
    map: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])).isRequired
  }),
  updateData: PropTypes.func.isRequired,
  mapPrompts: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    members: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['date', 'number', 'string']),
    required: PropTypes.bool
  }))
};

export default Data;
