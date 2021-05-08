import * as ReactJSXRuntimeDev from "react/jsx-dev-runtime"
import Styled from "./styled"

export const Fragment = ReactJSXRuntimeDev.Fragment

export function jsxDEV(type, props, key, isStaticChildren, source, self) {
  if (props.hasOwnProperty("css")) {
    let newProps = { type }

    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        newProps[key] = props[key]
      }
    }

    return ReactJSXRuntimeDev.jsxDEV(
      Styled,
      newProps,
      key,
      isStaticChildren,
      source,
      self
    )
  } else {
    return ReactJSXRuntimeDev.jsxDEV(
      type,
      props,
      key,
      isStaticChildren,
      source,
      self
    )
  }
}
