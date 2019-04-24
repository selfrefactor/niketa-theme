require('../ants/gradStop')
const rgbHex = require('rgb-hex')
import { init, tail, replace, map, split, dropLast } from 'rambdax'

const parseGradient = input => {
  const str = replace(/rgb\(|\)/g, '', input)

  return map(
    val => Number(val.trim()),
    split(',', str)
  )
}

function parseInput(fromRaw, toRaw){
  let changed = false
  const [ from, to ] = [ fromRaw, toRaw ].map(
    x => {
      if (x.length === 7) return x

      changed = true

      return dropLast(2, x)
    }
  )

  return {
    from,
    to,
    changed,
  }
}

export function getGradientBee(fromRaw, toRaw, levels = 5){
  const { from, to, changed } = parseInput(fromRaw, toRaw)
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

  if (!changed) return gradient

  return [
    fromRaw,
    ...init(tail(gradient)),
    toRaw,
  ]
}
