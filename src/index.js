import { partialCurry, pass, pluck, map, ok, equals } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { getGradientBee } from './bees/getGradient'
import { createThemeBee } from './bees/createTheme'
import { randomColorBee } from './bees/randomColor'
import { saveThemeBee, namesHash } from './bees/saveTheme'
import { writeJsonAnt } from './ants/writeJson'
import { pascalCase } from 'string-fn'

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

function publishTheme({ index, name }){
  const tempName = pascalCase(`baboon.${ namesHash[ index ] }`)
  console.log({ tempName })
  const theme = readJsonAnt(
    `./baboon/${ tempName }.json`
  )
  const exported = readJsonAnt(
    'exported.json'
  )
  const themeName = pascalCase(name)
  const themePath = `./themes/${ themeName }.json`

  if (
    !pluck('label', exported).includes(themeName)
  ){
    exported.push({
      label   : themeName,
      uiTheme : 'vs',
      path    : themePath,
    })
  }

  writeJsonAnt(
    'exported.json',
    exported
  )
  saveToPackageJson(exported)

  theme.name = themeName
  writeJsonAnt(
    themePath,
    theme
  )
}

function saveToPackageJson(partialJson){
  const packageJson = readJsonAnt(
    'packageBase.json'
  )
  const newPackageJson = {
    ...packageJson,
    contributes : { themes : partialJson },
  }
  writeJsonAnt('package.json', newPackageJson)
}

export function createTheme({
  filePath,
  rules,
  random,
  publish,
  levels,
}){
  if (!equals({}, publish)) return publishTheme(publish)
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

  const devJson = tempLabels.map(
    label => ({
      label,
      uiTheme : 'vs',
      path    : `./baboon/${ label }.json`,
    })
  )

  saveToPackageJson(devJson)
}
