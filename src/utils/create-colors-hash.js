const { mapToObject } = require('rambdax')

function createColorsHash(colors){
  if (colors.length !== 5) throw 'colors.length !== 5'

  return mapToObject((color, i) => ({ [ `COLOR_${ i }` ] : color }), colors)
}

exports.createColorsHash = createColorsHash
