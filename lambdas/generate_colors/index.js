import { writeJsonAnt } from '../../src/ants/writeJson'
import { translate } from '../../src/ants/mini/translate'
import { getGradientBee } from '../../src/bees/getGradient'
import {
  flatten,
  piped,
  uniq,
  log,
} from 'rambdax'
const base = 'src/ants/generate_colors/colors'

export function generateColorsAnt({
  input,
  levels = 20,
  label = '',
}){
  const [ firstRaw, secondRaw ] = input
  const OUTPUT = `${ base }/${ label }_COLORS.json`

  const first = firstRaw.startsWith('#') ?
    firstRaw :
    translate(firstRaw)

  const second = secondRaw.startsWith('#') ?
    secondRaw :
    translate(secondRaw)

  const colors = piped(
    getGradientBee(first, second, levels),
    uniq,
  )
  // log({ OUTPUT })

  return writeJsonAnt(OUTPUT, flatten(colors))
}
