import { writeJsonAnt } from '../writeJson'
import { translate } from '../mini/translate'
import { getGradientBee } from '../../bees/getGradient'

const OUTPUT = 'src/ants/generateColors/manyColors.json'

export function generateColorsAnt(colorsOrKeys){
  const [ firstRaw, secondRaw ] = colorsOrKeys

  const first = firstRaw.startsWith('#') ?
    firstRaw :
    translate(firstRaw)

  const second = secondRaw.startsWith('#') ?
    secondRaw :
    translate(secondRaw)

  const colors = getGradientBee(first, second, 88)

  // const toSave = colors.map()
  // const withBrigherFirst
  writeJsonAnt(OUTPUT, colors)
}
