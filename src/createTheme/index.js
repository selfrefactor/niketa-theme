import { partialCurry, pass, map, ok } from 'rambdax'
import { readJsonSync } from 'fs-extra'
import { getGradientBee } from './bees/getGradient'
import { createThemeBee } from './bees/createTheme'
import { randomColorBee } from './bees/randomColor'
import { saveThemeBee } from './bees/saveTheme'
import { publishTheme } from './bees/publishTheme'

function getRulesWithColors({
  levels,
  random,
  rules,
}){
  if (!pass(random)({ changes : Number })){
    return map(
      ([ from, to ]) => getGradientBee(from, to, levels),
      rules
    )
  }
  const randomColor = partialCurry(
    randomColorBee,
    {
      distance      : random.distance,
      numberChanges : random.changes,
    }
  )
  const newRules = map(
    ([ from, to ]) => {
      const newFrom = randomColor({ color : from })
      const newTo = randomColor({ color : to })
      if (random.indexes.length === 2) return [ newFrom, newTo ]
      if (random.indexes.includes(1)) return [ from, newTo ]

      return [ newFrom, to ]
    },
    rules
  )

  return map(
    ([ from, to ]) => getGradientBee(from, to, levels),
    newRules
  )
}

export function createTheme({
  filePath,
  rules,
  random,
  publish,
  levels,
}){
  ok(filePath, levels)(String, Number)
  ok(random, rules, publish)(Object)
  const originTheme = readJsonSync(filePath)
  const rulesWithColors = getRulesWithColors({
    random,
    levels,
    rules,
  })
}

// const newThemes = createThemeBee(
//   rulesWithColors,
//   originTheme,
// )
// const tempLabels = newThemes.map(saveThemeBee)

// const partialJson = tempLabels.map(
//   label => ({
//     label   : `Ant${ label }`,
//     uiTheme : mode === 'light' ? 'vs' : 'vs-dark',
//     path    : `./src/createTheme/output/${ label }.json`,
//   })
// )
// if (!base){
//   return console.log(
//     JSON.stringify(partialJson, null, 2)
//   )
// }

// const exportedLabels = labels.map(
//   (label, i) => publishTheme(
//     partialJson[ i ].path,
//     label,
//     base
//   )
// )
// console.log({ exportedLabels })
// const packageJsonPartial = exportedLabels.map(
//   label => ({
//     label,
//     uiTheme : mode === 'light' ? 'vs' : 'vs-dark',
//     path    : `./themes/${ label }.json`,
//   })
// )

// console.log(
//   JSON.stringify(packageJsonPartial, null, 2)
// )
