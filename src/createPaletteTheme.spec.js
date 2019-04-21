import { createPaletteTheme } from './createPaletteTheme'
import { readJsonAnt } from './ants/readJson'
import { constantCase } from 'string-fn'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/generated/boring.json`
const filePathRandom = [
  `${ base }/generated/randomFirst.json`,
  `${ base }/generated/randomSecond.json`,
  `${ base }/generated/randomThird.json`,
  `${ base }/generated/randomX.json`,
  `${ base }/generated/randomY.json`,
  `${ base }/generated/randomZ.json`,
  `${ base }/generated/randomJohn.json`,
  `${ base }/generated/randomPaul.json`,
  `${ base }/generated/randomJones.json`,
]

const PALLETE_INDEX = 0
const PALLETE_RANDOM_FLAG = true
const RATE = 0.068
const TARGET_INDEX = 2

const TARGETS = [
  [ 'teal.1', 'teal.1' ],
  [ 'dark.blue.8', 'blue.8' ],
  [ 'dark.green.10', 'dark.blue.2' ],
  [ 'navy.4', 'dark.blue.2' ],
  [ 'light.red.0', 'red.0' ],
  [ 'orange.6', 'navy.0' ],
  [ 'light.yellow.2', 'dark.purple.1' ],
  [ 'grey.0', 'dark.brown.2' ],
  [ 'dark.purple.3', 'secondary.9' ],
  [ 'back.13', 'back.3' ], 2
    [ 'pink.2', 'dark.pink.3' ],
  [ 'green.2', 'dark.green.3' ],
  [ 'dark.purple.1', 'purple.2' ],
  [ 'secondary.7', 'purple.2' ],
]

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

function translateColor(colorKeyRaw){
  const colors = readJsonAnt('colors.json')

  const colorKey = constantCase(colorKeyRaw)
  const [ num ] = [ ...colorKeyRaw ].filter(x => Number(x) === Number(x))

  const actualColor = colors[ colorKey ][ String(num) ]

  return actualColor
}

const rulesWithTwoColors = {
  COLOR_BACK      : [ '#f1f1dd', '#f6f6d6' ],
  COLOR_SECONDARY : [ '#D9D4BA', '#a6aBaF' ],
  COLOR_SELECTION : [ fetchTargetComplex(0), '#eae3cd' ],
  COLOR_0         : [ '#cd7c55', fetchTargetComplex(0) ],
  COLOR_1         : [ translateColor('dark.purple.1'), fetchTargetComplex(0) ],
  COLOR_2         : [ '#36456F', fetchTargetComplex(1) ],
  COLOR_3         : [ '#79753C', fetchTargetComplex(0) ],
  COLOR_4         : [ '#c83a71', fetchTargetComplex(1) ],
  COLOR_5         : [ '#3EA8C4', fetchTargetComplex(1) ],
}

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
    'BACK_9',
    'BACK_17',
  ],
  COLOR_SECONDARY : [
    'SECONDARY_2',
    'SECONDARY_9',
  ],
  COLOR_SELECTION : [
    'SELECTION_1',
    'SELECTION_2',
  ],
  COLOR_0 : [
    'red.2',
    fetchTarget(0),
  ],
  COLOR_1 : [
    'dark.red.8',
    fetchTarget(1),
  ],
  COLOR_2 : [
    'dark.blue.3',
    fetchTarget(0),
  ],
  COLOR_3 : [
    'dark.purple.4',
    fetchTarget(1),
  ],
  COLOR_4 : [
    'brown.8',
    fetchTarget(0),
  ],
  COLOR_5 : [
    'orange.1',
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

test('happy', () => {

  createPaletteTheme({
    showList : false,
    complex  : true,
    filePath : PALLETE_RANDOM_FLAG ?
      filePathRandom[ PALLETE_INDEX ] :
      filePath,
    rules  : rulesComplexWithTargets,
    levels : 22,
    rate   : RATE,
    // publishName  : 'circus.people',
    // publishIndex : 1,
  })
})
