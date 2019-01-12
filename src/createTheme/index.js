import { map, ok } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { getGradientBee } from './bees/getGradient'
import { createThemeBee } from './bees/createTheme'
import { saveThemeBee } from './bees/saveTheme'

export function createTheme(filePath, rules){
  ok(readJsonAnt, rules)(
    String, Object
  )
  const originTheme = readJsonAnt(filePath)
  const rulesWithColors = map(
    ([ from, to ]) => getGradientBee(from, to),
    rules
  )
  
  const newThemes = createThemeBee(
      rulesWithColors,
      originTheme,
  )
  newThemes.forEach(saveThemeBee)
}
