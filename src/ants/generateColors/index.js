import { writeJsonAnt } from '../writeJson'
import { translate } from '../mini/translate'
import { getGradientBee } from '../../bees/getGradient'
import {
  flatten,
  pipe,
  piped,
  tail,
  take,
  sort,
  uniq,
  ifElse,
} from 'rambdax'
import hexSorter from 'hexsorter'
const base = 'src/ants/generateColors/colors'

export function compareColors(a, b){
  if (!a) return 1
  if (!b) return -1

  const brighter = hexSorter.mostBrightColor([ a, b ])

  return brighter === a ? -1 : 1
}

function getOpacities(levels = 10){
  return piped(
    getGradientBee('#770000', '#fe0000', levels),
    x => x.map(take(3)),
    x => x.map(tail)
  )
}

export function applyOpacities(hexColor){
  const opacities = getOpacities()

  return opacities.map(
    singleOpacity => `${ hexColor }${ singleOpacity }`
  )
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

  const whenOpacity = pipe(
    x => x.map(applyOpacities),
    flatten,
    sort(compareColors)
  )

  const colors = piped(
    getGradientBee(first, second, 500),
    uniq,
    x => opacityFlag ?
      whenOpacity(x) :
      x
  )

  writeJsonAnt(OUTPUT, colors)
}
