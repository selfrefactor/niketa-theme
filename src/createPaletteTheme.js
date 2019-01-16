import { partialCurry, pluck, map, ok, equals, range, replace } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { changeColorAnt } from './ants/changeColor'
import { readFileSync } from 'fs-extra'
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

function createPaletteRule(prop, colorBase, rate){
  const willReturn = {}
  const modes = [
    'DARKER',
    'LIGHTER',
    'DARK',
    'LIGHT',
  ]
  modes.forEach(mode => {
    const newColor = changeColorAnt(colorBase, mode, rate)

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

function singlePaletteTheme({filePath, rules, rate}){
  const rulesKeys = Object.keys(rules)
  let content = readFileSync(filePath).toString()

  range(0,rulesKeys.length).forEach(i => {
    const prop = rulesKeys[i]
    const colorBase = rules[prop]
    const paletteRule = createPaletteRule(prop, colorBase, rate)
    content = applyPaletteBee(content, paletteRule)
  })
  savePaletteThemeBee(content, 0)
}

function publishTheme(name, index){
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

export function createPaletteTheme({
  filePath,
  rules,
  rate,
  publishName
}){
  ok(filePath, rules)(String, Object)
  singlePaletteTheme({
    filePath,
    rules,
    rate
  })
  const devJson = [{
    label: 'BaboonAnt',
    uiTheme : 'vs',
    path    : `./baboon/BaboonAnt.json`,
  }]
  saveToPackageJson(devJson)
  if(!publishName) return
  publishTheme(publishName, 0)
}
