import {  ok, range, replace, map } from 'rambdax'
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

function singlePaletteTheme({filePath, rules, rate, index = 0}){
  const rulesKeys = Object.keys(rules)
  let content = readFileSync(filePath).toString()

  range(0,rulesKeys.length).forEach(i => {
    const prop = rulesKeys[i]
    const colorBase = rules[prop]
    const paletteRule = createPaletteRule(prop, colorBase, rate)
    content = applyPaletteBee(content, paletteRule)
  })
  return savePaletteThemeBee(content, index)
}

function getCurrentRules(rules, i){
  return map(x => x[i], rules)
}

function createPaletteThemeBee({
  filePath, 
  rules, 
  rate
}){
  const keys = Object.keys(rules)
  
  return range(0, rules[keys[0]].length).map(i => {
    const currentRules = getCurrentRules(rules, i)
    const savedLabel = singlePaletteTheme({
      filePath, 
      rules: currentRules,
      rate, 
      index: i
    })  

    return {
      label: savedLabel,
      uiTheme : 'vs',
      path    : `./baboon/${savedLabel}.json`,
    }
  })
}

function isGradientMode(rules){
  let flag = false
  map(
    x => {
      if(Array.isArray(x)) flag = true
    }
  )(rules)

  return true
}

const createGradientRules = map(
  x => Array.isArray(x) ? x : [x,x] 
)
const getRulesWithGradients = (rules, levels) => map(
  ([ from, to ]) => getGradientBee(from, to, levels)
)(rules)

function simplePalette({
  filePath,
  rules,
  rate,
  publishName
}){
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

export function createPaletteTheme({
  filePath,
  rules,
  rate,
  levels = 4,
  publishName
}){
  ok(filePath, rules)(String, Object)
  if(!isGradientMode(rules)){
    return simplePalette(arguments[0])
  }
  const gradientRules = createGradientRules(rules)
  const rulesWithGradients = getRulesWithGradients(gradientRules, levels)   
  const devJson = createPaletteThemeBee({
    rules: rulesWithGradients,
    filePath,
    rate
  })

  saveToPackageJsonAnt(devJson)
}

