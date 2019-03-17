import './index.css';
import React from 'react';
import PropTypes from 'prop-types';
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

var styles = {"component":"chartwerk_ui_components___2fOvCuaRi5","spinAround":"chartwerk_ui_components___h--yO4IvsE"};

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).call(this, props));
    _this.state = {
      activeTab: 0
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var activeTab = this.state.activeTab;
      var _this$props = this.props,
          tabs = _this$props.tabs,
          components = _this$props.components;
      var activeComponents = components[activeTab];
      var Tabs = tabs.map(function (tab, i) {
        return React.createElement("li", {
          className: classnames({
            'is-active': i === activeTab
          }),
          onClick: function onClick() {
            return _this2.setState({
              activeTab: i
            });
          },
          key: tab
        }, React.createElement("a", null, tab));
      });
      return React.createElement("div", {
        className: classnames('tabs', styles.component)
      }, React.createElement("div", {
        className: "tabs"
      }, React.createElement("ul", null, Tabs)), activeComponents);
    }
  }]);

  return Tabs;
}(React.Component);

Tabs.propsTypes = {
  tabs: PropTypes.array.isRequired,
  components: PropTypes.arrayOf(PropTypes.array.isRequired)
};

export default Tabs;
