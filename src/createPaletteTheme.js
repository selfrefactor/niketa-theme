import {  ok, range, replace } from 'rambdax'
import { changeColorAnt } from './ants/changeColor'
import { readFileSync } from 'fs-extra'
import { publishThemeBee } from './bees/publishTheme'
import { savePaletteThemeBee } from './bees/saveTheme'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { getGradientBee } from './bees/getGradient'

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
  saveToPackageJsonAnt(devJson)
  
  if(!publishName) return
  publishThemeBee(publishName, 0)
}

