require('../ants/gradStop')
import rgbHex from 'rgb-hex'
import { rangeBy } from '../ants/mini/rangeBy'
import { hexToNumber } from '../ants/changeColor'
import { toHex } from '../ants/applyDistance'

import {
  map,
  dropLast,
  takeLast,
  replace,
  repeat,
  split,
} from 'rambdax'

const parseGradient = input => {
  const str = replace(/rgb\(|\)/g, '', input)

  return map(
    val => Number(val.trim()),
    split(',', str)
  )
}

function whenOpacity(from, toRaw, levels){
  const to = takeLast(2, toRaw)
  const fromBase = dropLast(2, from)
  const fromOpacity = takeLast(2, from)

  const toAsHex = hexToNumber(to)
  const fromAsHex = hexToNumber(fromOpacity)
  const distance = Math.abs(Math.floor((fromAsHex - toAsHex) / levels))

  const toReturn = rangeBy(fromAsHex, toAsHex, distance).map(toHex)
    .map(x => `${ fromBase }${ x }`)

  return toReturn
}

export function getGradientBee(from, to, levels = 5){
  if (from.length === 9) return whenOpacity(from, to, levels)
  if (to.length === 9) return repeat(to, levels)
  if (to.length === 2) throw new Error('from color is not opacity color')

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
