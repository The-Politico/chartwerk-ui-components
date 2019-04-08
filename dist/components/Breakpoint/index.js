import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faDesktop } from '@fortawesome/free-solid-svg-icons';

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

var styles = {"component":"chartwerk_ui_components___39-jLywSgw","spinAround":"chartwerk_ui_components___3jYO_6s8Ws"};

var Ramp =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Ramp, _React$Component);

  function Ramp() {
    _classCallCheck(this, Ramp);

    return _possibleConstructorReturn(this, _getPrototypeOf(Ramp).apply(this, arguments));
  }

  _createClass(Ramp, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          breakpoints = _this$props.breakpoints,
          breakpoint = _this$props.breakpoint,
          updateBreakpoint = _this$props.updateBreakpoint;
      var length = breakpoints.length;
      var pointWidth = 100 / length;
      var index = breakpoints.indexOf(breakpoint);
      return React.createElement("div", {
        className: classnames(styles.component)
      }, React.createElement("div", {
        className: "level"
      }, React.createElement("div", {
        className: "level-left"
      }, React.createElement(FontAwesomeIcon, {
        icon: faMobileAlt
      })), React.createElement("div", {
        className: "level-item"
      }, React.createElement("div", {
        className: "gutter"
      }, breakpoints.map(function (point, i) {
        return React.createElement("div", {
          className: "point-option",
          style: {
            width: "".concat(pointWidth, "%")
          },
          onClick: function onClick() {
            return updateBreakpoint(point);
          },
          key: point
        });
      }), React.createElement("div", {
        className: "active-point",
        style: {
          width: "".concat(pointWidth, "%"),
          left: "".concat(index * pointWidth, "%")
        }
      }))), React.createElement("div", {
        className: "level-right"
      }, React.createElement(FontAwesomeIcon, {
        icon: faDesktop
      }))));
    }
  }]);

  return Ramp;
}(React.Component);

var Breakpoint =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Breakpoint, _React$Component);

  function Breakpoint() {
    _classCallCheck(this, Breakpoint);

    return _possibleConstructorReturn(this, _getPrototypeOf(Breakpoint).apply(this, arguments));
  }

  _createClass(Breakpoint, [{
    key: "render",
    value: function render() {
      var breakpoint = this.props.breakpoint;
      return React.createElement("div", null, React.createElement(Ramp, this.props), React.createElement("div", {
        className: "preview",
        style: {
          width: "".concat(breakpoint, "px")
        }
      }, this.props.children));
    }
  }]);

  return Breakpoint;
}(React.Component);

Breakpoint.defaultProps = {
  breakpoints: [290, 350, 600],
  breakpoint: 600
};
Breakpoint.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.number),
  breakpoint: PropTypes.number,
  updateBreakpoint: PropTypes.func.isRequired
};

export default Breakpoint;
