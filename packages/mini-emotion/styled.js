import React from "react"
import { serialize, compile, middleware, prefixer, stringify } from "stylis"
import { withStylesCache } from "./cache"

const isBrowser = typeof window !== "undefined"

function Styled({ props, cache }) {
  const { css, type } = props
  let styles = ""

  if (typeof css === "object" && !cache.styles[css.name]) {
    styles += serialize(
      compile(`.css-${css.name}{${css.styles}}`),
      middleware([prefixer, stringify])
    )
    // cache.styles[css.name] = css.styles
    cache.styles[css.name] = { raw: css.styles, serialized: styles }

    if (isBrowser) {
      cache.sheet.insert(styles)
    }

    for (let i = 0; i < css.keyframes.length; i++) {
      if (!cache.styles[css.keyframes[i].name]) {
        const serialized = serialize(
          compile(
            `@keyframes animation-${css.keyframes[i].name}{${css.keyframes[i].styles}}`
          ),
          middleware([prefixer, stringify])
        )
        // cache.styles[css.keyframes[i].name] = css.keyframes[i].styles
        cache.styles[css.keyframes[i].name] = {
          raw: css.keyframes[i].styles,
          serialized,
          inserted: false,
        }
        if (isBrowser) {
          cache.sheet.insert(serialized)
          // cache.sheet.insert(
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
            cache.sheet.insert(cache.styles[css.keyframes[i].name].serialized)
            cache.styles[css.keyframes[i].name].inserted = true
          }
        }
      }
    }
  } else {
    if (isBrowser) {
      cache.sheet.insert(cache.styles[css.name].serialized)
    }
  }

  let newProps = { className: `css-${props.css.name}` }

  for (let key in props) {
    if (
      key !== "cache" &&
      key !== "className" &&
      key !== "class" &&
      key !== "css"
    ) {
      newProps[key] = props[key]
    }
  }

  return React.createElement(type, newProps)
}

export default withStylesCache(Styled)
