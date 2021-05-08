import React from "react"
import Styled from "./styled"

function jsx(type, props) {
  if (props == null || !props.hasOwnProperty("css")) {
    return React.createElement.apply(undefined, arguments)
  } else {
    let newProps = {
      type,
      css: props.css,
    }

    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        newProps[key] = props[key]
      }
    }

    let newArgs = []
    newArgs[0] = Styled
    newArgs[1] = newProps

    for (let i = 2; i < arguments.length; i++) {
      newArgs[i] = arguments[i]
    }

    return React.createElement.apply(null, newArgs)
  }
}

export { jsx }
