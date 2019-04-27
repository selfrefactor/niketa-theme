import { partialCurry, map, ok } from 'rambdax'
import { readJsonAnt } from '../readJson'
import { getGradientBee } from '../../bees/getGradient'
import { createThemeBee } from '../../bees/createTheme'
import { randomColorBee } from '../../bees/randomColor'
import { saveThemeBee } from '../../bees/saveTheme'
import { publishThemeBee } from '../../bees/publishTheme'
import { saveToPackageJsonAnt } from '../../ants/saveToPackageJson'

function getRulesWithColors({
  levels,
  random,
  rules,
}){
  if (!random){
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
  ok(random)({ changes : Number })

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

export function editThemeChrome({
  filePath,
  rules,
  random,
  publishIndex,
  publishName,
  levels,
}){
  if (publishName) return publishThemeBee(publishName, publishIndex)
  ok(filePath, levels)(String, Number)
  ok(rules)(Object)

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

  const devJson = tempLabels.map(
    label => ({
      label,
      uiTheme : 'vs',
      path    : `./baboon/${ label }.json`,
    })
  )

  saveToPackageJsonAnt(devJson)
}
