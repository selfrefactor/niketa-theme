const { map } = require('rambdax')
const { PUNCTUATION_COLOR } = require('../assets/themes-colors')

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
  const newTokenColors = map(tokenColor => ({
    ...tokenColor,
    settings : {
      ...tokenColor.settings,
      foreground : isPunctuation(tokenColor.name) ?
        PUNCTUATION_COLOR :
        colors[ tokenColor.settings.foreground ],
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
