function createStyleElement() {
  let tag = document.createElement("style")
  tag.appendChild(document.createTextNode(""))
  return tag
}

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet
  }

  for (let i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i]
    }
  }
}

export default class Stylesheet {
  constructor(options) {
    this.tags = []
    this.ctr = 0
    this.container = typeof window === "undefined" ? null : options.container // head
    this.isSpeedy =
      options.isSpeedy === undefined
        ? process.env.NODE_ENV === "production"
        : options.speedy
  }

  _insertTag(tag) {
    this.container.insertBefore(tag, null)
    this.tags.push(tag)
  }

  insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement())
    }

    const tag = this.tags[this.tags.length - 1]

    if (this.isSpeedy) {
      const sheet = sheetForTag(tag)

      try {
        // we don't want to use this in develpoment because the style won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length)
      } catch (e) {
        throw e
      }
    } else {
      tag.appendChild(document.createTextNode(rule))
    }

    this.ctr++
  }

  flush() {
    this.tags.forEach((tag) => tag.parentNode.removeChild(tag))
    this.tags = []
    this.ctr = 0
  }
}
