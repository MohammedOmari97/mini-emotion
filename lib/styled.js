"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _stylis = require("stylis");

var _cache = require("./cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isBrowser = typeof window !== "undefined";

function Styled(_ref) {
  var props = _ref.props,
      cache = _ref.cache;
  var css = props.css,
      type = props.type;
  var styles = "";

  if (_typeof(css) === "object" && !cache.styles[css.name]) {
    styles += (0, _stylis.serialize)((0, _stylis.compile)(".css-".concat(css.name, "{").concat(css.styles, "}")), (0, _stylis.middleware)([_stylis.prefixer, _stylis.stringify])); // cache.styles[css.name] = css.styles

    cache.styles[css.name] = {
      raw: css.styles,
      serialized: styles
    };

    if (isBrowser) {
      cache.sheet.insert(styles);
    }

    for (var i = 0; i < css.keyframes.length; i++) {
      if (!cache.styles[css.keyframes[i].name]) {
        var serialized = (0, _stylis.serialize)((0, _stylis.compile)("@keyframes animation-".concat(css.keyframes[i].name, "{").concat(css.keyframes[i].styles, "}")), (0, _stylis.middleware)([_stylis.prefixer, _stylis.stringify])); // cache.styles[css.keyframes[i].name] = css.keyframes[i].styles

        cache.styles[css.keyframes[i].name] = {
          raw: css.keyframes[i].styles,
          serialized: serialized,
          inserted: false
        };

        if (isBrowser) {
          cache.sheet.insert(serialized); // cache.sheet.insert(
          //   serialize(
          //     compile(
          //       `@keyframes animation-${css.keyframes[i].name}{${css.keyframes[i].styles}}`
          //     ),
          //     middleware([prefixer, stringify])
          //   )
          // )
        }
      } else {
        if (isBrowser) {
          if (!cache.styles[css.keyframes[i].name].inserted) {
            cache.sheet.insert(cache.styles[css.keyframes[i].name].serialized);
            cache.styles[css.keyframes[i].name].inserted = true;
          }
        }
      }
    }
  } else {
    if (isBrowser) {
      cache.sheet.insert(cache.styles[css.name].serialized);
    }
  }

  var newProps = {
    className: "css-".concat(props.css.name)
  };

  for (var key in props) {
    if (key !== "cache" && key !== "className" && key !== "class" && key !== "css") {
      newProps[key] = props[key];
    }
  }

  return /*#__PURE__*/_react["default"].createElement(type, newProps);
}

var _default = (0, _cache.withStylesCache)(Styled);

exports["default"] = _default;