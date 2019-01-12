require('../ants/gradStop')
const rgbHex = require('rgb-hex')
import { replace, map, split } from 'rambdax'

const parseGradient = input => {
  const str = replace(/rgb\(|\)/g, '', input)

  return map(
    val => Number(val.trim()),
    split(',', str)
  )
}

export function getGradientBee(from, to){
  console.log({
    from,
    to,
  })
  let gradient = gradStop({
    stops       : 5,
    inputFormat : 'hex',
    colorArray  : [ from, to ],
  })
  gradient = gradient.map(val => parseGradient(val))
  gradient = gradient.map(val => `#${ rgbHex(...val) }`)

  return gradient
}
