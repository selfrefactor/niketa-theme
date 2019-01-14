import { random } from 'rambdax'

function toHex(d) {
  return  (Number(d).toString(16)).slice(-2).toUpperCase()
}

function getRandomChar(decimal, distance){
  const maybeResult = decimal - distance
  if(maybeResult < 0) return 0 
  if(maybeResult > 15) return 15
  return maybeResult 
}

function getRandomDistance(distance){
  return random(0,1) === 1 ? distance : -distance
}

export function applyDistanceAnt(char, distance){
  const decimal = parseInt(char, 16)
  if(decimal > 13) return decimal - distance
  if(decimal < 4) return decimal + distance

  return toHex(
    getRandomChar(
      decimal,
      getRandomDistance(distance) 
    )
  ) 
}