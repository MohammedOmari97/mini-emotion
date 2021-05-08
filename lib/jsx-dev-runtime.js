"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsxDEV = jsxDEV;
exports.Fragment = void 0;

var ReactJSXRuntimeDev = _interopRequireWildcard(require("react/jsx-dev-runtime"));

var _styled = _interopRequireDefault(require("./styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Fragment = ReactJSXRuntimeDev.Fragment;
exports.Fragment = Fragment;

function jsxDEV(type, props, key, isStaticChildren, source, self) {
  if (props.hasOwnProperty("css")) {
    var newProps = {
      type: type
    };

    for (var _key in props) {
      if (props.hasOwnProperty(_key)) {
        newProps[_key] = props[_key];
      }
    }

    return ReactJSXRuntimeDev.jsxDEV(_styled["default"], newProps, key, isStaticChildren, source, self);
  } else {
    return ReactJSXRuntimeDev.jsxDEV(type, props, key, isStaticChildren, source, self);
  }
}