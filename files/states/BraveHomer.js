import { createPaletteTheme } from './createPaletteTheme'
import { translate } from './ants/mini/translate'
import { FetchTargetColor } from './ants/mini/fetchTargetColor'

const PALLETE_INDEX = 0
const PALLETE_RANDOM_FLAG = false
const RATE = 0.055
const TARGET_INDEX = 12
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
  [ 'dark.1', 'dark.4' ], // for darker themes
  [ 'dark.purple.3', 'dark.purple.3' ],
  [ 'dark.purple.0', 'dark.purple.1' ],
  [ 'grey.0', 'dark.brown.2' ],
  [ 'pink.2', 'dark.pink.3' ],
  [ 'green.2', 'dark.green.3' ],
  [ 'dark.purple.1', 'purple.2' ],
]

const FetchTargetColorI = new FetchTargetColor({
  targetIndex : TARGET_INDEX,
  targets     : TARGETS,
})


const fetchZero = FetchTargetColorI.is(0)
const fetchOne = FetchTargetColorI.is(1)
const fetchZeroSimple = FetchTargetColorI.isSimple(0)
const fetchOneSimple = FetchTargetColorI.isSimple(1)

const rulesWithTwoColors = {
  COLOR_BACK      : [ '#e7e6e0', 'back.17' ],
  // TODO persist flag as no gradient is generated
  COLOR_SECONDARY : [ '#d1d3d4', '#9eb4ad' ],
  COLOR_SELECTION : [ '#eec2bb', '#eae3cd' ],
  COLOR_0         : [ '#2f5866e9', fetchOne ],
  COLOR_1         : [ '#a76b42', fetchZero ],
  COLOR_2         : [ '#5a8851e9', fetchOne ],
  COLOR_3         : [ '#b45948f1', fetchZero ],
  COLOR_4         : [ '#0068a8', fetchOne ],
  COLOR_5         : [ '#861d4ff1', fetchZero ],
}
// ac5e53e9

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
    fetchOneSimple,
  ],
  COLOR_2 : [
    'dark.green.7',
    fetchZeroSimple,
  ],
  COLOR_3 : [
    'brown.2',
    fetchOneSimple,
  ],
  COLOR_0 : [
    'brown.4',
    fetchOneSimple,
  ],
  COLOR_5 : [
    'dark.red.8',
    fetchZeroSimple,
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
    publishName  : 'brave.homer',
    publishIndex : 2,
  })
})

function getFilePathRandom(index){
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

  return filePathRandom[ index ]
}

function getRuleWithOneColor(){
  return {
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
}
