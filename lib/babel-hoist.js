"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var packageName = "@mini-emotion/core";

module.exports = function (_ref) {
  var t = _ref.types;
  return {
    visitor: {
      Program: {
        enter: function enter(path) {
          var isImported = false;
          path.traverse({
            ImportDeclaration: function ImportDeclaration(path) {
              if (path.node.source.value === packageName) {
                var specifiers = path.get("specifiers");

                var _iterator = _createForOfIteratorHelper(specifiers),
                    _step;

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var specifier = _step.value;

                    if (specifier.isImportSpecifier() && specifier.node.imported.name === "css") {
                      isImported = true;
                      break;
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }
            },
            CallExpression: function CallExpression(path) {
              if (!path.get("callee").isIdentifier() || path.node.callee.name !== "require") {
                return;
              }

              var args = path.get("arguments");
              var arg = args[0];

              if (!arg || !arg.isStringLiteral() || arg.node.value !== packageName) {
                return;
              }

              isImported = true; // might cause false positives
            }
          });

          if (!isImported) {
            return;
          }

          path.traverse({
            JSXIdentifier: function JSXIdentifier(path) {
              if (path.node.name !== "css") return;
              if (!t.isJSXAttribute(path.parent)) return; // avoid elements named `css`

              var expr = path.parentPath.get("value.expression");
              if (!expr.isObjectExpression) return;

              if (expr.isPure()) {
                expr.hoist();
              }
            },
            CallExpression: function CallExpression(path) {
              var node = path.node;

              if (node.callee.name === "css" && node.callee.type === "Identifier") {
                path.get("arguments").forEach(function (x) {
                  return x.isPure() && x.hoist();
                });
              }
            }
          });
        }
      }
    }
  };
};