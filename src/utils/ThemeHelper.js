import load from './load'

export default function (root) {
  const preloadTheme = (href) => {
    return Promise.all(
      [
        load.css(href, document.head),
        load.css(href, root)
      ]
    ).then(csss => {
      return [
        ...csss.map(target => {
          const sheet = target.sheet
          sheet.disabled = true
          return sheet
        })
      ]
    })
  }

  const selectTheme = (themes, name) => {
    if (name && !themes[name]) {
      throw new Error(`"${name}" has not been defined as a theme.`)
    }
    Object.keys(themes).forEach(n => {
      let disabled = (n !== name)
      themes[n].forEach(shit => (shit.disabled = disabled))
    })
  }

  let themes = {}

  return {
    add (name, href) { return preloadTheme(href).then(s => (themes[name] = s)) },
    set theme (name) { selectTheme(themes, name) },
    get theme () { return Object.keys(themes).find(n => themes[n][0] && !themes[n][0].disabled) }
  }
}
