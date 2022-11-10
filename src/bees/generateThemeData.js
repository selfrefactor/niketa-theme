const { changeColorAnt } = require('../ants/changeColor')
const { map, mergeAll } = require('rambdax')
const { PUNCTUATION_COLOR } = require('../assets/themes-colors')

function createPaletteRule(
  prop, colorBase, rate = 0.045
){
  const willReturn = {}
  const modes = [ 'DARKEST', 'DARKER', 'LIGHTER', 'LIGHTEST', 'DARK', 'LIGHT' ]
  modes.forEach(mode => {
    const newColor = changeColorAnt(
      colorBase, mode, rate
    )

    willReturn[ `${ prop }_${ mode }` ] = newColor
  })

  willReturn[ prop ] = colorBase

  return willReturn
}

function generateThemeData({ palette, chrome, colors }){
  const translatedColors = mergeAll(map((color, prop) => createPaletteRule(prop, color))(colors))
  const newTokenColors = map(tokenColor => {
    return {
      ...tokenColor,
      settings: {
        ...tokenColor.settings,
        foreground:  tokenColor.name.startsWith('punctuation.') ? PUNCTUATION_COLOR : translatedColors[ tokenColor.settings.foreground ]
      }
    }
  })(palette.tokenColors)
  const newTheme = {
    ...palette,
    colors      : chrome,
    tokenColors : newTokenColors,
  }

  return newTheme
}

exports.generateThemeData = generateThemeData
