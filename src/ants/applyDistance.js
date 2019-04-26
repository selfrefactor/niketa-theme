import { random, maybe } from 'rambdax'

export function toHex(d){
  return Number(d).toString(16)
    .slice(-2)
    .toUpperCase()
}

function getRandomChar(decimal, distance){
  const maybeResult = decimal - distance
  if (maybeResult < 0) return 0
  if (maybeResult > 15) return 15

  return maybeResult
}

function getRandomDistance(distance){
  return random(0, 1) === 1 ? distance : -distance
}

export function applyDistanceAnt(char, distance){
  const decimal = parseInt(char, 16)
  const randomChar = getRandomChar(
    decimal,
    getRandomDistance(distance)
  )
  const hex = maybe(
    decimal > 13,
    decimal - distance,
    decimal < 4 ? decimal + distance : randomChar
  )

  return toHex(hex)
}
