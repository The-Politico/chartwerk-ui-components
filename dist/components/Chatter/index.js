import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import classnames from 'classnames';

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

var styles = {"component":"chartwerk_ui_components___1CPabYE21v"};

var styles$1 = {"component":"chartwerk_ui_components___3HyS-1zOvh","spinAround":"chartwerk_ui_components___GiWVKEErQG"};

var Input =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, _getPrototypeOf(Input).apply(this, arguments));
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          label = _this$props.label,
          inputKey = _this$props.inputKey,
          value = _this$props.value,
          update = _this$props.update,
          placeholder = _this$props.placeholder,
          maxLength = _this$props.maxLength,
          markdownHints = _this$props.markdownHints;
      return React.createElement("div", {
        className: classnames(styles$1.component)
      }, React.createElement("div", {
        className: "field"
      }, React.createElement("label", {
        className: "label"
      }, label || inputKey, maxLength && React.createElement("small", {
        className: classnames({
          zero: maxLength - value.length < 10
        })
      }, maxLength - value.length)), React.createElement("div", {
        className: "control"
      }, React.createElement("input", {
        className: "input",
        type: "text",
        placeholder: placeholder,
        maxLength: maxLength,
        value: value,
        onChange: function onChange(_ref) {
          var target = _ref.target;
          return update(_defineProperty({}, inputKey, target.value));
        }
      }), React.createElement("p", {
        className: "help",
        hidden: !markdownHints
      }, React.createElement("span", {
        className: "bold"
      }, "**bold**"), React.createElement("span", {
        className: "italic"
      }, "_italic_"), React.createElement("span", {
        className: "link"
      }, "[link](http...)")))));
    }
  }]);

  return Input;
}(React.Component);

var styles$2 = {"component":"chartwerk_ui_components___1C6PGAMc3-","spinAround":"chartwerk_ui_components___1__QG5u96S"};

var TextArea =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TextArea, _React$Component);

  function TextArea() {
    _classCallCheck(this, TextArea);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextArea).apply(this, arguments));
  }

  _createClass(TextArea, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          label = _this$props.label,
          inputKey = _this$props.inputKey,
          value = _this$props.value,
          update = _this$props.update,
          placeholder = _this$props.placeholder,
          maxLength = _this$props.maxLength,
          markdownHints = _this$props.markdownHints;
      return React.createElement("div", {
        className: classnames(styles$2.component)
      }, React.createElement("div", {
        className: "field"
      }, React.createElement("label", {
        className: "label"
      }, label || inputKey, maxLength && React.createElement("small", {
        className: classnames({
          zero: maxLength - value.length < 10
        })
      }, maxLength - value.length)), React.createElement("div", {
        className: "control"
      }, React.createElement("textarea", {
        className: "textarea",
        type: "text",
        placeholder: placeholder,
        maxLength: maxLength,
        rows: 3,
        value: value,
        onChange: function onChange(_ref) {
          var target = _ref.target;
          return update(_defineProperty({}, inputKey, target.value));
        }
      }), React.createElement("p", {
        className: "help",
        hidden: !markdownHints
      }, React.createElement("span", {
        className: "bold"
      }, "**bold**"), React.createElement("span", {
        className: "italic"
      }, "_italic_"), React.createElement("span", {
        className: "link"
      }, "[link](http...)")))));
    }
  }]);

  return TextArea;
}(React.Component);

var Chatter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Chatter, _React$Component);

  function Chatter(props) {
    var _this;

    _classCallCheck(this, Chatter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Chatter).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "update", function (updateObj) {
      var chatter = _this.state.chatter;
      var updatedChatter = Object.assign({}, chatter, updateObj);

      _this.setState({
        chatter: updatedChatter
      });

      _this.debouncedUpdate();
    });

    _defineProperty(_assertThisInitialized(_this), "debouncedUpdate", function () {
      var updateChatter = _this.props.updateChatter;
      var chatter = _this.state.chatter;
      updateChatter(chatter);
    });

    _this.state = {
      chatter: props.chatter || {}
    };
    _this.debouncedUpdate = debounce(_this.debouncedUpdate, props.updateDebounce);
    return _this;
  }

  _createClass(Chatter, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var inputProps = this.props.inputProps;
      var chatter = this.state.chatter;
      var Inputs = Object.keys(chatter).map(function (key) {
        var props = inputProps[key] || {};
        return props.textarea ? React.createElement(TextArea, _extends({
          inputKey: key,
          value: chatter[key],
          update: _this2.update
        }, inputProps[key] || {}, {
          key: key
        })) : React.createElement(Input, _extends({
          inputKey: key,
          value: chatter[key],
          update: _this2.update
        }, inputProps[key] || {}, {
          key: key
        }));
      });
      return React.createElement("div", {
        className: classnames(styles.component)
      }, Inputs);
    }
  }]);

  return Chatter;
}(React.Component);

Chatter.defaultProps = {
  inputProps: {},
  updateDebounce: 250
};
Chatter.propTypes = {
  inputProps: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    textarea: PropTypes.bool
  })),
  chatter: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  updateChatter: PropTypes.func.isRequired,
  updateDebounce: PropTypes.number
};

export default Chatter;
