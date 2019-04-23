import { writeJsonAnt } from '../writeJson'
import { translate } from '../mini/translate'
import { getGradientBee } from '../../bees/getGradient'
import { uniq, piped, tail, take, flatten } from 'rambdax'
const base = 'src/ants/generateColors/colors'

function getOpacities(levels = 10){
  return piped(
    getGradientBee('#770000', '#fe0000', levels),
    x => x.map(take(3)),
    x => x.map(tail)
  )
}

function applyOpacities(hexColor){
  // console.log({hexColor})
  const opacities = getOpacities()

  return opacities.map(
    singleOpacity => `${ hexColor }${ singleOpacity }`
  )
}

console.log(
  applyOpacities('#a43441')
)

export function generateColorsAnt(colorsOrKeys, label = ''){
  const [ firstRaw, secondRaw ] = colorsOrKeys
  const OUTPUT = `${ base }/${ label }_COLORS.json`

  const first = firstRaw.startsWith('#') ?
    firstRaw :
    translate(firstRaw)

  const second = secondRaw.startsWith('#') ?
    secondRaw :
    translate(secondRaw)

  const colors = piped(
    getGradientBee(first, second, 500),
    uniq,
    x => x.map(applyOpacities),
    flatten,
    // x => x.map(xx => xx.map(applyOpacities))
  )
  writeJsonAnt(OUTPUT, colors)
}
