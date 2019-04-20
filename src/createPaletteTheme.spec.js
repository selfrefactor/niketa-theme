import { createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/generated/boring.json`
const filePathRandom = [
  `${ base }/generated/randomFirst.json`,
  `${ base }/generated/randomSecond.json`,
  `${ base }/generated/randomThird.json`,
  `${ base }/generated/randomX.json`,
  `${ base }/generated/randomY.json`,
  `${ base }/generated/randomZ.json`,
]

const TARGET_INDEX = 6

const TARGETS = [
  ['light.yellow.2', 'dark.purple.1'],
  ['grey.0', 'dark.brown.2'],
  ['dark.purple.3', 'secondary.9'],
  ['back.13', 'back.3'],2
  ['pink.2', 'dark.pink.3'],
  ['green.2', 'dark.green.3'],
  ['dark.purple.1', 'purple.2'],
]

function fetchTarget(mode){
  const [whenZero, whenOne] = TARGETS[TARGET_INDEX]

  return mode === 0 ? whenZero : whenOne
}

function fetchTargetComplex(mode){
  const colors = readJsonAnt('colors.json')
  const [whenZero, whenOne] = TARGETS[TARGET_INDEX]

  const colorKeyRaw = mode === 0 ? whenZero : whenOne

  console.log(colors);
  throw 'sd' 
  const colorKey = constantCase(colorKeyRaw)
  const [num] = [...colorKeyRaw].filter(x => x*1 === Number(x))

  const actualColor = color[colorKey][String(num)]

  return actualColor
}


const rulesWithTwoColors = {
  COLOR_BACK      : [ '#f1f1db', '#f1f1db' ],
  COLOR_SECONDARY : [ '#C4C0A7', '#cfccb7' ],
  COLOR_SELECTION : [ fetchTargetComplex(0), '#eae3cd' ],
  COLOR_0         : [ '#218aaf', fetchTargetComplex(0) ],
  COLOR_1         : [ '#C55E33', fetchTargetComplex(1) ],
  COLOR_2         : [ '#24A058', fetchTargetComplex(0) ],
  COLOR_3         : [ '#5a245f', fetchTargetComplex(1) ],
  COLOR_4         : [ '#8e1f2f', fetchTargetComplex(1) ],
  COLOR_5         : [ '#AB3574', fetchTargetComplex(0) ],
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
    'BACK_12',
    'BACK_12',
  ],
  COLOR_SECONDARY : [
    'SECONDARY_8',
    'SECONDARY_8',
  ],
  COLOR_SELECTION : [
    'SELECTION_2',
    'SELECTION_2',
  ],
  COLOR_0 : [
    'navy.2',
    fetchTarget(0),
  ],
  COLOR_1 : [
    'grey.5',
    fetchTarget(1),
  ],
  COLOR_2 : [
    'dark.blue.0',
    fetchTarget(0),
  ],
  COLOR_3 : [
    'light.red.0',
    fetchTarget(1),
  ],
  COLOR_4 : [
    'teal.2',
    fetchTarget(0),
  ],
  COLOR_5 : [
    'ochra.2',
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
    showList:false,
    complex      : true,
    filePath     : filePathRandom[ 0 ],
    rules        : rulesWithTwoColors,
    levels       : 22,
    rate         : 0.073,
    // publishName  : 'advanced.ajax',
    // publishIndex : 3,
  })
})
