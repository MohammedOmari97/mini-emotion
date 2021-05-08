"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsx = jsx;

var _react = _interopRequireDefault(require("react"));

var _styled = _interopRequireDefault(require("./styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function jsx(type, props) {
  if (props == null || !props.hasOwnProperty("css")) {
    return _react["default"].createElement.apply(undefined, arguments);
  } else {
    var newProps = {
      type: type,
      css: props.css
    };

    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        newProps[key] = props[key];
      }
    }

    var newArgs = [];
    newArgs[0] = _styled["default"];
    newArgs[1] = newProps;

    for (var i = 2; i < arguments.length; i++) {
      newArgs[i] = arguments[i];
    }

    return _react["default"].createElement.apply(null, newArgs);
  }
}