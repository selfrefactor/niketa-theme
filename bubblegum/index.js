require('./ant/gradStop')
const { replace, map, split } = require('rambdax')
const rgbHex = require('rgb-hex')

const parseGradient = input => {
  const str = replace(/rgb\(|\)/g, '', input)

  return map(
    val => Number(val.trim()),
    split(',', str)
  )
}

void function bubblegum(){
  
  let gradient = gradStop({
    stops       : 5,
    inputFormat : 'hex',
    colorArray  : ['#fafafa', '#4a4a4a' ],
  })
  gradient = gradient.map(val => parseGradient(val))
  gradient = gradient.map(val => `#${ rgbHex(...val) }`)
  console.log({gradient})
}()