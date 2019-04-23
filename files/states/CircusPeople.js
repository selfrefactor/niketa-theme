import { createPaletteTheme } from './createPaletteTheme'
import { readJsonAnt } from './ants/readJson'
import { constantCase } from 'string-fn'

const PALLETE_INDEX = 3
const PALLETE_RANDOM_FLAG = true
const RATE = 0.055
const TARGET_INDEX = 13
const TARGETS = [
  [ 'dark.brown.3', 'random.2' ],
  [ 'dark.0', 'grey.5' ],
  [ 'dark.red.6', 'dark.pink.7' ],
  [ 'dark.green.10', 'dark.purple.4' ],
  [ 'dark.pink.7', 'navy.7' ],
  [ 'teal.1', 'teal.1' ],
  [ 'dark.blue.8', 'blue.8' ],
  [ 'dark.green.10', 'dark.blue.2' ],
  [ 'navy.4', 'dark.blue.2' ],
  [ 'light.red.0', 'red.0' ],
  [ 'orange.6', 'navy.0' ],
  [ 'secondary.5', 'ochra.0' ], // for darker themes
  [ 'navy.7', 'dark.1' ], // for darker themes
  [ 'dark.blue.9', 'dark.3' ], // for darker themes
  [ 'dark.purple.3', 'dark.purple.3' ],
  [ 'dark.purple.0', 'dark.purple.1' ],
  [ 'grey.0', 'dark.brown.2' ],
  [ 'pink.2', 'dark.pink.3' ],
  [ 'green.2', 'dark.green.3' ],
  [ 'dark.purple.1', 'purple.2' ],
]


const rulesWithTwoColors = {
  COLOR_BACK      : [ '#f3f3e2', '#f6f6e9' ],
  COLOR_SECONDARY : [ '#D9D4BA', '#a6aBaF' ],
  COLOR_SELECTION : [ '#eec2bb', '#eae3cd' ],
  COLOR_0         : [ '#3EA8C4', fetchTargetComplex(0) ],
  COLOR_1         : [ '#aa769b', fetchTargetComplex(1) ],
  COLOR_2         : [ translate('dark.green.6'), fetchTargetComplex(1) ],
  COLOR_3         : [ translate('dark.blue.0'), fetchTargetComplex(0) ],
  // COLOR_3         : [ '#79753C', fetchTargetComplex(0) ],
  COLOR_4         : [ '#c83a71', fetchTargetComplex(1) ],
  COLOR_5         : [ translate('random.2'), fetchTargetComplex(1) ],
}


// const rulesWithTwoColors = {
//   COLOR_BACK      : [ '#f9f6f2', '#ede8e1' ],
//   COLOR_SECONDARY : [ '#cacacc', '#9eb4ad' ],
//   COLOR_SELECTION : [ '#eec2bb', '#eae3cd' ],
//   COLOR_0         : [ translate('dark.purple.4'), fetchTargetComplex(0) ],
//   COLOR_1         : [ '#3f7063', fetchTargetComplex(1) ],
//   COLOR_2         : [ translate('blue.9'), fetchTargetComplex(1) ],
//   COLOR_3         : [ '#d95361', fetchTargetComplex(0) ],
//   COLOR_4         : [ '#985155', fetchTargetComplex(0) ],
//   COLOR_5         : [ translate('ochra.4'), fetchTargetComplex(1) ],
// }

const rulesWithOneColor = {
  COLOR_BACK      : '#f9f7f5',
  COLOR_SECONDARY : '#ebe5d6',
  COLOR_SELECTION : '#a1a1a1',
  COLOR_0         : '#46758D',
  COLOR_1         : '#9a4e4e',
  COLOR_2         : '#aa769b',
  COLOR_3         : '#880e4f',
  COLOR_4         : '#7e735f',
  COLOR_5         : '#8e1f2f',
}

const rulesComplexWithTargets = {
  COLOR_BACK : [
    '#c1bcae',
    '#c1bcae',
  ],
  COLOR_SECONDARY : [
    'secondary.8',
    'secondary.8',
  ],
  COLOR_SELECTION : [
    'SELECTION_1',
    'SELECTION_2',
  ],
  COLOR_0 : [
    '#9B6397',
    '#1B6397',
  ],
  COLOR_1 : [
    'dark.blue.1',
    fetchTarget(0),
  ],
  COLOR_2 : [
    'dark.green.7',
    fetchTarget(1),
  ],
  COLOR_3 : [
    'brown.2',
    fetchTarget(1),
  ],
  COLOR_0 : [
    'brown.4',
    fetchTarget(0),
  ],
  COLOR_5 : [
    'dark.red.8',
    fetchTarget(1),
  ],
}

const rulesComplex = {
  COLOR_BACK : [
    'BACK_11',
    'BACK_6',
  ],
  COLOR_SECONDARY : [
    'SECONDARY_7',
    'SECONDARY_1',
  ],
  COLOR_SELECTION : [
    'SELECTION_0',
    'SELECTION_1',
  ],
  COLOR_0 : [
    'orange.2',
    'light.blue.7',
  ],
  COLOR_1 : [
    'light.green.2',
    'dark.purple.0',
  ],
  COLOR_2 : [
    'green.3',
    'light.blue.7',
  ],
  COLOR_3 : [
    'navy.2',
    'light.blue.7',
  ],
  COLOR_4 : [
    'red.3',
    'dark.purple.0',
  ],
  COLOR_5 : [
    'pink.2',
    'dark.purple.0',
  ],
}

const base = '/home/s/repos/niketa-theme/palettes'
const filePath = `${ base }/generated/boring.json`

test('happy', () => {

  createPaletteTheme({
    showList : false,
    complex  : true,
    filePath : PALLETE_RANDOM_FLAG ?
      getFilePathRandom(PALLETE_INDEX) :
      filePath,
    rules  : rulesWithTwoColors,
    levels : 22,
    rate   : RATE,
    publishName  : 'circus.people',
    publishIndex : 2,
  })
})

function fetchTarget(mode){
  const [ whenZero, whenOne ] = TARGETS[ TARGET_INDEX ]

  return mode === 0 ? whenZero : whenOne
}

function fetchTargetComplex(mode){
  const colors = readJsonAnt('colors.json')
  const [ whenZero, whenOne ] = TARGETS[ TARGET_INDEX ]

  const colorKeyRaw = mode === 0 ? whenZero : whenOne

  const colorKey = constantCase(colorKeyRaw)
  const [ num ] = [ ...colorKeyRaw ].filter(x => Number(x) === Number(x))

  const actualColor = colors[ colorKey ][ String(num) ]

  return actualColor
}

function translate(colorKeyRaw){
  const colors = readJsonAnt('colors.json')

  const colorKey = constantCase(colorKeyRaw)
  const [ num ] = [ ...colorKeyRaw ].filter(x => Number(x) === Number(x))

  const actualColor = colors[ colorKey ][ String(num) ]

  return actualColor
}

function getFilePathRandom(index){
  const filePathRandom = [
    `${ base }/generated/randomFirst.json`, `${ base }/generated/randomSecond.json`, `${ base }/generated/randomThird.json`, `${ base }/generated/randomX.json`,
    `${ base }/generated/randomY.json`,
    `${ base }/generated/randomZ.json`,
    `${ base }/generated/randomJohn.json`,
    `${ base }/generated/randomPaul.json`,
    `${ base }/generated/randomJones.json`,
  ]

  return filePathRandom[ index ]
}
