import { flatten, piped, uniq } from 'rambdax'

import { writeJsonAnt } from '../../src/ants/writeJson'
import { getGradientBee } from '../../src/bees/getGradient'
const base = 'lambdas/generate_colors/colors'

export function generateColors({ input, levels = 20, label = '' }){
  const [ first, second ] = input
  const OUTPUT = `${ base }/${ label }_COLORS.json`

  const colors = piped(getGradientBee(
    first, second, levels
  ), uniq)

  return writeJsonAnt(OUTPUT, flatten(colors))
}
