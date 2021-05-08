import ReactJSXRuntime from "react/jsx-runtime"
import Styled from "./styled"

export function jsx(type, props, key) {
  if (!props.hasOwnProperty("css")) {
    return ReactJSXRuntime.jsx(type, props, key)
  }

  let newProps = {}

  for (let key in props) {
    if (props.hasOwnProperty(key)) {
      newProps[key] = props[key]
    }
  }

  return ReactJSXRuntime.jsx(Styled, newProps)
}

export function jsxs(type, props, key) {
  if (!props.hasOwnProperty("css")) {
    return ReactJSXRuntime.jsxs(type, props, key)
  }

  let newProps = {}

  for (let key in props) {
    if (props.hasOwnProperty(key)) {
      newProps[key] = props[key]
    }
  }

  return ReactJSXRuntime.jsxs(Styled, newProps)
}
