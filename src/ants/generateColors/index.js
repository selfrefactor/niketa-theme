import { writeJsonAnt } from '../writeJson'
import { translate } from '../mini/translate'
import { getGradientBee } from '../../bees/getGradient'
import {
  flatten,
  piped,
  tail,
  take,
  sort,
  uniq,
  shuffle,
} from 'rambdax'
const base = 'src/ants/generateColors/colors'

function getOpacities(levels = 5){
  return piped(
    getGradientBee('#440000', '#fe0000', levels),
    x => x.map(take(3)),
    x => x.map(tail)
  )
}

export function applyOpacities(hexColor){
  if (hexColor.length === 9){

    return [ hexColor ]
  }

  const opacities = getOpacities()

  const toReturn = opacities.map(
    singleOpacity => `${ hexColor }${ singleOpacity }`
  )

  return [ `||||||| BASE |||||||| ${ hexColor }`, toReturn ]
}

export function generateColorsAnt(colorsOrKeys, opacityFlag = false, label = ''){
  const [ firstRaw, secondRaw ] = colorsOrKeys
  const OUTPUT = `${ base }/${ label }_COLORS.json`

  const first = firstRaw.startsWith('#') ?
    firstRaw :
    translate(firstRaw)

  const second = secondRaw.startsWith('#') ?
    secondRaw :
    translate(secondRaw)

  const colors = piped(
    getGradientBee(first, second, 50),
    uniq,
  )

  if (!opacityFlag) return writeJsonAnt(OUTPUT, flatten(colors))

  const withOpacities = flatten(colors).map(applyOpacities)

  const toSave = flatten(withOpacities)

  writeJsonAnt(OUTPUT, toSave)
}
