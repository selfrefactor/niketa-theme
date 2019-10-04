import { map, mergeAll } from 'rambdax'
import { createPaletteRule } from '../createPaletteTheme'

export function generateThemeDataBee({ palette, chrome, colors }){
  const translatedColors = mergeAll(map(
    (color, prop) => createPaletteRule(prop, color)
  )(colors))
  const newTokenColors = map(
    tokenColor => {
      if (tokenColor.name === 'source.json'){
        // console.log(tokenColor,colors, palette,'before')
      }
      tokenColor.settings.foreground = translatedColors[ tokenColor.settings.foreground ]

      if (tokenColor.name === 'source.json'){
        // console.log(tokenColor,'after')
      }

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
