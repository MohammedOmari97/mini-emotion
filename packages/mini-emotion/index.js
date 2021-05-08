import { serialize, compile, stringify, middleware, prefixer } from "stylis"
import Stylesheet from "./sheet"
import hash from "./hash"
import { jsx } from "./jsx"
import { createCache, flush } from "./cache"

// const sheet = new Stylesheet({ speedy: false, container: document.head })

// const insertedStyles = {}

// const cache = new WeakMap();

function handleInterpolation(interpolation) {
  if (typeof interpolation === "boolean") {
    return ""
  } else if (typeof interpolation === "function") {
    return interpolation()
  } else {
    return ""
  }
}

function createStyles(strings, interpolations) {
  let styles = strings[0]
  let keyframes = []

  if (interpolations.length > 0) {
    for (let i = 0; i < interpolations.length; i++) {
      if (typeof interpolations[i] === "function") {
        styles += handleInterpolation(interpolations[i])

        if (strings[i + 1] !== undefined) {
          styles += strings[i + 1]
        }
      } else if (typeof interpolations[i] === "string") {
        styles += interpolations[i]

        if (strings[i + 1] !== undefined) {
          styles += strings[i + 1]
        }
      } else if (
        typeof interpolations[i] === "object" &&
        interpolations[i].type === "keyframe"
      ) {
        keyframes.push(interpolations[i])
        styles += `animation-${interpolations[i].name}`

        if (strings[i + 1] !== undefined) {
          styles += strings[i + 1]
        }
      } else if (
        typeof interpolations[i] === "object" &&
        interpolations[i].type === "styles"
      ) {
        styles += interpolations[i].styles

        if (interpolations[i].keyframes.length > 0) {
          keyframes.push(...interpolations[i].keyframes)
        }

        if (strings[i + 1] !== undefined) {
          styles += strings[i + 1]
        }
      } else {
        throw new Error("interpolation is not a function or a string")
      }
    }
  }

  return { styles, keyframes }
}

function css(strings, ...interpolations) {
  const _styles = createStyles(strings, interpolations)
  const hashed = hash(_styles.styles)

  return { ..._styles, name: hashed, type: "styles" }

  // const styles = serialize(
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

function keyframes(strings, ...interpolations) {
  const { styles } = createStyles(strings, interpolations)
  // const styles = serialize(compile(_styles), stringify)
  const hashed = hash(styles)
  // const animation = `animation-${hashed}`

  return { name: hashed, styles, type: "keyframe" }

  // if (!insertedStyles[hashed]) {
  //   insertedStyles[hashed] = styles
  //   sheet.insert(`@keyframes ${animation}{${styles}}`)
  // }

  // return animation
}

// export function fontFace(strings, ...interpolations) {
//   const _styles = createStyles(strings, interpolations)
//   const styles = serialize(compile(_styles), stringify)
//   const hashed = hash(styles)

//   if (!insertedStyles[hashed]) {
//     insertedStyles[hashed] = styles
//     sheet.insert(`@font-face{${styles}}`)
//   }
// }

export { extract } from "./server/extract"
export { createCache } from "./cache"
export { jsx, css, keyframes, flush }
