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

export function getGradientBee(from, to, levels = 5){
  let gradient
  try {
    gradient = gradStop({
      stops       : levels,
      inputFormat : 'hex',
      colorArray  : [ from, to ],
    })
  } catch (e){
    console.log({
      from,
      to,
    })
    throw e
  }
  gradient = gradient.map(val => parseGradient(val))
  gradient = gradient.map(val => `#${ rgbHex(...val) }`)

  return gradient
}
