import React, { createContext, forwardRef, useContext } from "react"

import Stylesheet from "./sheet"

const sheet = new Stylesheet({
  speedy: false,
  container: typeof window === "undefined" ? null : document.head,
})

let Cache = createContext(createCache())
console.log(Cache)

export const Provider = Cache.Provider

export function withStylesCache(Component) {
  return forwardRef((props, ref) => {
    const cache = useContext(Cache)

    return Component({ props, ref, cache })
  })
}

export function createCache() {
  return {
    styles: {},
    sheet,
  }
}

export function flush() {
  sheet.flush()
}

export default Cache
