const { mapObject } = require('rambdax')

function createColorsHash(colors){
  if (colors.length !== 5) throw 'colors.length !== 5'
  
  let result = mapObject((color, i) => ({ [ `COLOR_${ i }` ] : color }), colors)
  return {
    ...result['0'],
    ...result['1'],
    ...result['2'],
    ...result['3'],
    ...result['4'],
  }
}

exports.createColorsHash = createColorsHash
