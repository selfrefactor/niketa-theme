import { ok, range, replace, map, init, last } from 'rambdax'
import { changeColorAnt } from './ants/changeColor'
import { readFileSync } from 'fs-extra'
import { publishThemeBee } from './bees/publishTheme'
import { savePaletteThemeBee } from './bees/saveTheme'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { getGradientBee } from './bees/getGradient'
import colors from '../colors.json'

function createPaletteRule(prop, colorBase, rate){
  const willReturn = {}
  const modes = [
    'DARKEST',
    'DARKER',
    'LIGHTER',
    'LIGHTEST',
    'DARK',
    'LIGHT',
  ]
  modes.forEach(mode => {
    const newColor = changeColorAnt(colorBase, mode, rate)

    willReturn[ `${ prop }_${ mode }` ] = newColor
  })

  willReturn[ prop ] = colorBase

  return willReturn
}

function applyPaletteBee(content, paletteRule){
  Object.keys(paletteRule).forEach(ruleKey => {
    const appliableColor = paletteRule[ ruleKey ]
    const regex = new RegExp(ruleKey, 'g')
    content = replace(regex, appliableColor, content)
  })

  return content
}

function singlePaletteTheme({ filePath, rules, rate, index = 0 }){
  const rulesKeys = Object.keys(rules)
  let content = readFileSync(filePath).toString()

  range(0, rulesKeys.length).forEach(i => {
    const prop = rulesKeys[ i ]
    const colorBase = rules[ prop ]
    const paletteRule = createPaletteRule(prop, colorBase, rate)
    content = applyPaletteBee(content, paletteRule)
  })

  return savePaletteThemeBee(content, index)
}

function getCurrentRules(rules, i){
  return map(x => x[ i ], rules)
}

function createPaletteThemeBee({
  filePath,
  rules,
  rate,
}){
  const keys = Object.keys(rules)

  return range(0, rules[ keys[ 0 ] ].length).map(i => {
    const currentRules = getCurrentRules(rules, i)
    const savedLabel = singlePaletteTheme({
      filePath,
      rules : currentRules,
      rate,
      index : i,
    })

    return {
      label   : savedLabel,
      uiTheme : 'vs',
      path    : `./baboon/${ savedLabel }.json`,
    }
  })
}

function isGradientMode(rules){
  let flag = false
  map(
    x => {
      if (Array.isArray(x)) flag = true
    }
  )(rules)

  return flag
}

const createGradientRules = map(
  x => Array.isArray(x) ? x : [ x, x ]
)

const getRulesWithGradients = (rules, levels) => map(
  ([ from, to ]) => getGradientBee(from, to, levels)
)(rules)

// Rules of type COLOR_1: #facafc
// Only one dev theme is created
// ============================================
function simpleMode({
  filePath,
  rules,
  rate,
}){
  singlePaletteTheme({
    filePath,
    rules,
    rate,
  })
  const devJson = [ {
    label   : 'BaboonAnt',
    uiTheme : 'vs',
    path    : './baboon/BaboonAnt.json',
  } ]
  saveToPackageJsonAnt(devJson)
}

// Rules of type COLOR_1: ['#542331', '#42aeac']
// ============================================
function gradientMode({
  filePath,
  rules,
  rate,
  levels = 12,
}){
  const gradientRules = createGradientRules(rules)
  const rulesWithGradients = getRulesWithGradients(gradientRules, levels)

  const devJson = createPaletteThemeBee({
    rules : rulesWithGradients,
    filePath,
    rate,
  })

  saveToPackageJsonAnt(devJson)
}

function applyPredefinedColors(tag){
  const parentKey = init(tag.split('_')).join('_')
  const index = last(tag.split('_'))
  const parent = colors[ parentKey ]
  if (!parent){
    // Rules of type COLOR_1: [dark.1, #433433]
    // ============================================
    return tag
  }
  const appliableColor = parent[ index ]
  if (!appliableColor){
    console.log(`EMPTY COLOR ${ tag } | FALLBACK TO #2a13a3`)

    return '#2a13a3'
  }

  return appliableColor
}

function normalize(rules){
  const willReturn = {}
  map(
    (x, key) => willReturn[ key ] = [
      replace(/\./g, '_', x[ 0 ]).toUpperCase(),
      replace(/\./g, '_', x[ 1 ]).toUpperCase(),
    ]
  )(rules)

  return willReturn
}

// Rules of type COLOR_1: ['DARK_1', 'BLUE_7']
// ============================================
function complexMode({
  rules,
  rate,
  levels = 12,
  filePath,
}){
  const rulesWithColors = map(
    ([ from, to ]) => [
      applyPredefinedColors(from),
      applyPredefinedColors(to),
    ]
  )(normalize(rules))

  return gradientMode({
    filePath,
    rules : rulesWithColors,
    rate,
    levels,
  })
}

export function createPaletteTheme({
  complex,
  filePath,
  rules,
  publishName,
  publishIndex = 0,
}){
  ok(filePath, rules)(String, Object)

  if (publishName) return publishThemeBee(publishName, publishIndex)

  if (complex) return complexMode(arguments[ 0 ])

  if (!isGradientMode(rules)) return simpleMode(arguments[ 0 ])

  return gradientMode(arguments[ 0 ])
}

