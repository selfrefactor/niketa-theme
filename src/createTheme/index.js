import { map, ok } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { writeJsonAnt } from './ants/writeJson'
import { getGradientBee } from './bees/getGradient'
import { createThemeBee } from './bees/createTheme'
import { saveThemeBee } from './bees/saveTheme'

export function createTheme(
  filePath, 
  rules, 
  mode = 'light'
){
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
  const labels = newThemes.map(saveThemeBee)
  
  const exportedLabels = labels.map(
    label => ({
      label,
      uiTheme: mode === 'light'? 'vs' : 'vs-dark',
      path: `./dist/createTheme/output/${label}.json`
    })
  )
  console.log(exportedLabels)
}
