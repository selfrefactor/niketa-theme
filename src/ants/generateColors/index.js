import { writeJsonAnt } from '../writeJson'
import { translate } from '../mini/translate'
import { getGradientBee } from '../../bees/getGradient'
import { uniq } from 'rambdax'
const base = 'src/ants/generateColors/colors'

export function generateColorsAnt(colorsOrKeys, label = ''){
  const [ firstRaw, secondRaw ] = colorsOrKeys
  const OUTPUT = `${ base }/${ label }_COLORS.json`

  const first = firstRaw.startsWith('#') ?
    firstRaw :
    translate(firstRaw)

  const second = secondRaw.startsWith('#') ?
    secondRaw :
    translate(secondRaw)

  const colors = getGradientBee(first, second, 500)

  writeJsonAnt(OUTPUT, uniq(colors))
}
