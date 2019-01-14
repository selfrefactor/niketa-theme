import { partialCurry, pass, map, ok, equals } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { getGradientBee } from './bees/getGradient'
import { createThemeBee } from './bees/createTheme'
import { randomColorBee } from './bees/randomColor'
import { saveThemeBee } from './bees/saveTheme'
import { publishTheme } from './bees/publishTheme'
import { writeJsonAnt } from './ants/writeJson'

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

function finalizeTempMode(partialJson){
  const packageJson = readJsonAnt(
    'packageBase.json'
  )
  const devJson = {
    ...packageJson,
    contributes : { themes : partialJson },
  }
  writeJsonAnt('package.json', devJson)
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
  const originTheme = readJsonAnt(filePath)
  const rulesWithColors = getRulesWithColors({
    random,
    levels,
    rules,
  })
  const newThemes = createThemeBee(
    rulesWithColors,
    originTheme,
  )
  const tempLabels = newThemes.map(saveThemeBee)
  console.log({ tempLabels })
  const partialJson = tempLabels.map(
    label => ({
      label,
      uiTheme : 'vs',
      path    : `./baboon/${ label }.json`,
    })
  )
  if (equals({}, publish)){
    return finalizeTempMode(partialJson)
  }
}

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
