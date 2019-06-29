import { map, mergeAll } from 'rambdax'
import { createPaletteRule } from '../createPaletteTheme'

export function generateThemeDataBee({ palette, chrome, colors }){
  const translatedColors = mergeAll(map(
    (color, prop) => createPaletteRule(prop, color)
  )(colors))

  const newTokenColors = map(
    tokenColor => {
      tokenColor.settings.foreground = translatedColors[ tokenColor.settings.foreground ]

      return tokenColor
    }
  )(palette.tokenColors)

  const newTheme = {
    ...palette,
    colors      : chrome,
    tokenColors : newTokenColors,
  }

  return newTheme
}
