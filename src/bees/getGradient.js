require('../ants/gradStop')
import {
  dropLast,
  last,
  map,
  repeat,
  replace,
  reverse,
  split,
  takeLast,
} from 'rambdax'
import rgbHex from 'rgb-hex'

import { toHex } from '../ants/applyDistance'
import { hexToNumber } from '../ants/changeColor'
import { rangeBy } from '../ants/mini/rangeBy'

const parseGradient = input => {
  const str = replace(
    /rgb\(|\)/g, '', input
  )

  return map(val => Number(val.trim()), split(',', str))
}

function whenOpacity(
  from, toRaw, levels
){
  const to = takeLast(2, toRaw)
  const fromBase = dropLast(2, from)
  const fromOpacity = takeLast(2, from)

  const toAsNumber = hexToNumber(to)
  const fromAsNumber = hexToNumber(fromOpacity)
  const distance = Math.abs(Math.floor((fromAsNumber - toAsNumber) / levels))

  const toReturnRaw = rangeBy(
    fromAsNumber, toAsNumber, distance
  )
    .map(toHex)
    .map(x => `${ fromBase }${ x }`)

  const toReturn =
    fromAsNumber < toAsNumber ? toReturnRaw : reverse(toReturnRaw)

  if (toReturn.length === levels) return toReturn

  const diff = Math.abs(levels - toReturn.length)

  if (toReturn.length < levels){
    const added = repeat(last(toReturn), diff)

    return [ ...toReturn, ...added ]
  }

  return dropLast(diff, toReturn)
}

export function getGradientBee(
  from, to, levels = 5
){
  if (from.length === 9) return whenOpacity(
    from, to, levels
  )
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
