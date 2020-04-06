require('../ants/gradStop')
import { map, replace, split } from 'rambdax'
import rgbHex from 'rgb-hex'

const parseGradient = input => {
  const str = replace(
    /rgb\(|\)/g, '', input
  )

  return map(val => Number(val.trim()), split(',', str))
}

export function getGradientBee(
  from, to, levels = 5
){
  let gradient
  try {
    gradient = gradStop({
      stops       : levels,
      inputFormat : 'hex',
      colorArray  : [ from, to ],
    })
    gradient = gradient.map(val => parseGradient(val))
    gradient = gradient.map(val => `#${ rgbHex(...val) }`)
  } catch (e){
    console.log({
      from,
      to,
    })
    throw e
  }

  return gradient
}
