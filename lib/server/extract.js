"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extract = extract;

var _stylis = require("stylis");

function extract(cache) {
  return function (html) {
    var RGX = new RegExp("css-([a-zA-Z0-9-_]+)", "gm");
    var o = {
      html: html,
      ids: [],
      css: ""
    };
    var match;
    var ids = {};

    while ((match = RGX.exec(html)) !== null) {
      if (ids[match[1]] === undefined) {
        ids[match[1]] = true;
      }
    }

    o.ids = Object.keys(cache.styles).filter(function (style) {
      if (cache.styles[style].type === "keyframe") {
        o.css += (0, _stylis.serialize)((0, _stylis.compile)("@keyframes animation-".concat(style, "{").concat(cache.styles[style].styles, "}")), (0, _stylis.middleware)([_stylis.prefixer, _stylis.stringify]));
      } else {
        o.css += (0, _stylis.serialize)((0, _stylis.compile)(".css-".concat(style, "{").concat(cache.styles[style], "}")), (0, _stylis.middleware)([_stylis.prefixer, _stylis.stringify]));
      }

      return true;
    });
    return o;
  };
}