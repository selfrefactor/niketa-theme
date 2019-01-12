import { map, ok } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { getGradientBee } from './bees/getGradient'
import { createThemeBee } from './bees/createTheme'
import { saveThemeBee } from './bees/saveTheme'
import { publishTheme } from './bees/publishTheme'

export function createTheme({
  filePath,
  rules,
  levels = 5,
  mode = 'light',
  base = false,
  labels,
}){
  ok(readJsonAnt, rules)(
    String, Object
  )
  const originTheme = readJsonAnt(filePath)
  const rulesWithColors = map(
    ([ from, to ]) => getGradientBee(from, to, levels),
    rules
  )

  const newThemes = createThemeBee(
    rulesWithColors,
    originTheme,
  )
  const tempLabels = newThemes.map(saveThemeBee)

  const partialJson = tempLabels.map(
    label => ({
      label   : `Ant${ label }`,
      uiTheme : mode === 'light' ? 'vs' : 'vs-dark',
      path    : `./src/createTheme/output/${ label }.json`,
    })
  )
  if (!base){
    return console.log(
      JSON.stringify(partialJson, null, 2)
    )
  }

  const exportedLabels = labels.map(
    (label, i) => publishTheme(
      partialJson[ i ].path, 
      label, 
      base
    )
  )
  console.log({ exportedLabels })
  const packageJsonPartial = exportedLabels.map(
    label => ({
      label,
      uiTheme : mode === 'light' ? 'vs' : 'vs-dark',
      path    : `./themes/${ label }.json`,
    })
  )

  console.log(
    JSON.stringify(packageJsonPartial, null, 2)
  )
}
