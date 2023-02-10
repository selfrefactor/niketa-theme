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

const PUNCTUATIONS = [
  'meta.group.braces.round.function.arguments',
  'function.brace',
  'meta.brace',
  'meta.brace.round',
  'meta.brace.square',
  'meta.group.braces.curly',
]

function isPunctuation(tokenColorName){
  if (tokenColorName.startsWith('punctuation.')) return true
  const found = PUNCTUATIONS.find(x => tokenColorName.startsWith(x))

  return Boolean(found)
}

function generateThemeData({ palette, chrome, colors }){
  const translatedColors = mergeAll(map((color, prop) => createPaletteRule(prop, color))(colors))
  const newTokenColors = map(tokenColor => ({
    ...tokenColor,
    settings : {
      ...tokenColor.settings,
      foreground : isPunctuation(tokenColor.name) ?
        PUNCTUATION_COLOR :
        translatedColors[ tokenColor.settings.foreground ],
    },
  }))(palette.tokenColors)
  const newTheme = {
    ...palette,
    colors      : chrome,
    tokenColors : newTokenColors,
  }

  return newTheme
}

exports.generateThemeData = generateThemeData
