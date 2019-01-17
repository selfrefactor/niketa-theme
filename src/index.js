import { partialCurry, pluck, map, ok, equals, range, replace } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { changeColorAnt } from './ants/changeColor'
import { readFileSync, writeFileSync } from 'fs-extra'
import { getGradientBee } from './bees/getGradient'
import { createThemeBee } from './bees/createTheme'
import { randomColorBee } from './bees/randomColor'
import { saveThemeBee, namesHash, savePaletteThemeBee } from './bees/saveTheme'
import { writeJsonAnt } from './ants/writeJson'
import { pascalCase } from 'string-fn'

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

function createPaletteRule(prop, colorBase){
  const willReturn = {}
  const modes = [
    'DARKER',
    'LIGHTER',
    'DARK',
    'LIGHT',
  ]
  modes.forEach(mode => {
    const newColor = changeColorAnt(colorBase, mode)

    willReturn[`${prop}_${mode}`] = newColor
  })

  willReturn[prop] = colorBase
  return willReturn
}

function applyPaletteBee(content, paletteRule){
  Object.keys(paletteRule).forEach(ruleKey => {
    const appliableColor = paletteRule[ruleKey]
    const regex = new RegExp(ruleKey,'g')
    content = replace(regex, appliableColor, content)
  })

  return content
}

function singlePaletteTheme({filePath, rules, nameIndex}){
  const rulesKeys = Object.keys(rules)
  let content = readFileSync(filePath).toString()

  range(0,rulesKeys.length).forEach(i => {
    const prop = rulesKeys[i]
    const colorBase = rules[prop][0]
    const paletteRule = createPaletteRule(prop, colorBase)
    content = applyPaletteBee(content, paletteRule)
  })
  savePaletteThemeBee(content, nameIndex)
  // writeFileSync(`${__dirname}/palette.json`, content)
}

export function createPaletteTheme({
  filePath,
  rules,
  boring,
  levels,
}){
  ok(filePath, levels)(String, Number)
  ok(rules)(Object)
  if(boring) return singlePaletteTheme({
    filePath,
    rules,
    nameIndex: 0
  })
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

  saveToPackageJson(devJson)
}
