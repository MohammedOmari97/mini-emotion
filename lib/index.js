"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = css;
exports.keyframes = keyframes;
Object.defineProperty(exports, "jsx", {
  enumerable: true,
  get: function get() {
    return _jsx.jsx;
  }
});
Object.defineProperty(exports, "flush", {
  enumerable: true,
  get: function get() {
    return _cache.flush;
  }
});
Object.defineProperty(exports, "createCache", {
  enumerable: true,
  get: function get() {
    return _cache.createCache;
  }
});
Object.defineProperty(exports, "extract", {
  enumerable: true,
  get: function get() {
    return _extract.extract;
  }
});

var _stylis = require("stylis");

var _sheet = _interopRequireDefault(require("./sheet"));

var _hash = _interopRequireDefault(require("./hash"));

var _jsx = require("./jsx");

var _cache = require("./cache");

var _extract = require("./server/extract");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// const sheet = new Stylesheet({ speedy: false, container: document.head })
// const insertedStyles = {}
// const cache = new WeakMap();
function handleInterpolation(interpolation) {
  if (typeof interpolation === "boolean") {
    return "";
  } else if (typeof interpolation === "function") {
    return interpolation();
  } else {
    return "";
  }
}

function createStyles(strings, interpolations) {
  var styles = strings[0];
  var keyframes = [];

  if (interpolations.length > 0) {
    for (var i = 0; i < interpolations.length; i++) {
      if (typeof interpolations[i] === "function") {
        styles += handleInterpolation(interpolations[i]);

        if (strings[i + 1] !== undefined) {
          styles += strings[i + 1];
        }
      } else if (typeof interpolations[i] === "string") {
        styles += interpolations[i];

        if (strings[i + 1] !== undefined) {
          styles += strings[i + 1];
        }
      } else if (_typeof(interpolations[i]) === "object" && interpolations[i].type === "keyframe") {
        keyframes.push(interpolations[i]);
        styles += "animation-".concat(interpolations[i].name);

        if (strings[i + 1] !== undefined) {
          styles += strings[i + 1];
        }
      } else if (_typeof(interpolations[i]) === "object" && interpolations[i].type === "styles") {
        styles += interpolations[i].styles;

        if (interpolations[i].keyframes.length > 0) {
          keyframes.push.apply(keyframes, _toConsumableArray(interpolations[i].keyframes));
        }

        if (strings[i + 1] !== undefined) {
          styles += strings[i + 1];
        }
      } else {
        throw new Error("interpolation is not a function or a string");
      }
    }
  }

  return {
    styles: styles,
    keyframes: keyframes
  };
}

function css(strings) {
  for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  var _styles = createStyles(strings, interpolations);

  var hashed = (0, _hash["default"])(_styles.styles);
  return _objectSpread(_objectSpread({}, _styles), {}, {
    name: hashed,
    type: "styles"
  }); // const styles = serialize(
  //   compile(`.css-${hashed}{${_styles}}`),
  //   middleware([prefixer, stringify])
  // )
  // const className = { className }
  // Object.defineProperty(className, "toString", {
  //   value() {
  //     return `css-${hashed}`
  //   },
  // })
  // if (!insertedStyles[hashed]) {
  //   insertedStyles[hashed] = styles
  // }
  // sheet.insert(styles)
  // return className
}

function keyframes(strings) {
  for (var _len2 = arguments.length, interpolations = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    interpolations[_key2 - 1] = arguments[_key2];
  }

  var _createStyles = createStyles(strings, interpolations),
      styles = _createStyles.styles; // const styles = serialize(compile(_styles), stringify)


  var hashed = (0, _hash["default"])(styles); // const animation = `animation-${hashed}`

  return {
    name: hashed,
    styles: styles,
    type: "keyframe"
  }; // if (!insertedStyles[hashed]) {
  //   insertedStyles[hashed] = styles
  //   sheet.insert(`@keyframes ${animation}{${styles}}`)
  // }
  // return animation
} // export function fontFace(strings, ...interpolations) {
//   const _styles = createStyles(strings, interpolations)
//   const styles = serialize(compile(_styles), stringify)
//   const hashed = hash(styles)
//   if (!insertedStyles[hashed]) {
//     insertedStyles[hashed] = styles
//     sheet.insert(`@font-face{${styles}}`)
//   }
// }