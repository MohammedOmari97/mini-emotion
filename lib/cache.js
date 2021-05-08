"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withStylesCache = withStylesCache;
exports.createCache = createCache;
exports.flush = flush;
exports["default"] = exports.Provider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _sheet = _interopRequireDefault(require("./sheet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var sheet = new _sheet["default"]({
  speedy: false,
  container: typeof window === "undefined" ? null : document.head
});
var Cache = /*#__PURE__*/(0, _react.createContext)(createCache());
console.log(Cache);
var Provider = Cache.Provider;
exports.Provider = Provider;

function withStylesCache(Component) {
  return /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    var cache = (0, _react.useContext)(Cache);
    return Component({
      props: props,
      ref: ref,
      cache: cache
    });
  });
}

function createCache() {
  return {
    styles: {},
    sheet: sheet
  };
}

function flush() {
  sheet.flush();
}

var _default = Cache;
exports["default"] = _default;