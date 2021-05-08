import { serialize, compile, middleware, prefixer, stringify } from "stylis"

function extract(cache) {
  return function (html) {
    let RGX = new RegExp(`css-([a-zA-Z0-9-_]+)`, "gm")
    let o = { html, ids: [], css: "" }
    let match
    let ids = {}

    while ((match = RGX.exec(html)) !== null) {
      if (ids[match[1]] === undefined) {
        ids[match[1]] = true
      }
    }

    o.ids = Object.keys(cache.styles).filter((style) => {
      if (cache.styles[style].type === "keyframe") {
        o.css += serialize(
          compile(
            `@keyframes animation-${style}{${cache.styles[style].styles}}`
          ),
          middleware([prefixer, stringify])
        )
      } else {
        o.css += serialize(
          compile(`.css-${style}{${cache.styles[style]}}`),
          middleware([prefixer, stringify])
        )
      }
      return true
    })

    return o
  }
}

export { extract }
