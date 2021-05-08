"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function createStyleElement() {
  var tag = document.createElement("style");
  tag.appendChild(document.createTextNode(""));
  return tag;
}

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }

  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}

var Stylesheet = /*#__PURE__*/function () {
  function Stylesheet(options) {
    _classCallCheck(this, Stylesheet);

    this.tags = [];
    this.ctr = 0;
    this.container = typeof window === "undefined" ? null : options.container; // head

    this.isSpeedy = options.isSpeedy === undefined ? process.env.NODE_ENV === "production" : options.speedy;
  }

  _createClass(Stylesheet, [{
    key: "_insertTag",
    value: function _insertTag(tag) {
      this.container.insertBefore(tag, null);
      this.tags.push(tag);
    }
  }, {
    key: "insert",
    value: function insert(rule) {
      if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
        this._insertTag(createStyleElement());
      }

      var tag = this.tags[this.tags.length - 1];

      if (this.isSpeedy) {
        var sheet = sheetForTag(tag);

        try {
          // we don't want to use this in develpoment because the style won't be editable in devtools
          sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e) {
          throw e;
        }
      } else {
        tag.appendChild(document.createTextNode(rule));
      }

      this.ctr++;
    }
  }, {
    key: "flush",
    value: function flush() {
      this.tags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.ctr = 0;
    }
  }]);

  return Stylesheet;
}();

exports["default"] = Stylesheet;