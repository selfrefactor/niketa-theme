require('./ant/gradStop')
const rgbHex = require('rgb-hex')
import { replace, map, split } from 'rambdax'

const parseGradient = input => {
  const str = replace(/rgb\(|\)/g, '', input)

  return map(
    val => Number(val.trim()),
    split(',', str)
  )
}

export function bubblegum(){
  
  let gradient = gradStop({
    stops       : 5,
    inputFormat : 'hex',
    colorArray  : ['#fafafa', '#4a4a4a' ],
  })
  gradient = gradient.map(val => parseGradient(val))
  gradient = gradient.map(val => `#${ rgbHex(...val) }`)
  console.log({gradient})
}