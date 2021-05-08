"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsx = jsx;
exports.jsxs = jsxs;

var _jsxRuntime = _interopRequireDefault(require("react/jsx-runtime"));

var _styled = _interopRequireDefault(require("./styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function jsx(type, props, key) {
  if (!props.hasOwnProperty("css")) {
    return _jsxRuntime["default"].jsx(type, props, key);
  }

  var newProps = {};

  for (var _key in props) {
    if (props.hasOwnProperty(_key)) {
      newProps[_key] = props[_key];
    }
  }

  return _jsxRuntime["default"].jsx(_styled["default"], newProps);
}

function jsxs(type, props, key) {
  if (!props.hasOwnProperty("css")) {
    return _jsxRuntime["default"].jsxs(type, props, key);
  }

  var newProps = {};

  for (var _key2 in props) {
    if (props.hasOwnProperty(_key2)) {
      newProps[_key2] = props[_key2];
    }
  }

  return _jsxRuntime["default"].jsxs(_styled["default"], newProps);
}