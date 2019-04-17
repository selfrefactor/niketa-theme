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

const TARGET = '#35495f'

const rulesWithTwoColors = {
  COLOR_BACK      : [ '#d8d5c9', '#d8d5c9' ],
  COLOR_SECONDARY : [ '#D9D4BA', '#a6aBaF' ],
  COLOR_SELECTION : [ '#abe5d6', '#eae3cd' ],
  COLOR_0         : [ '#218aaf', TARGET ],
  COLOR_1         : [ '#C55E33', TARGET ],
  COLOR_2         : [ '#24A058', TARGET ],
  COLOR_3         : [ '#5a245f', TARGET ],
  // COLOR_3         : [ '#80cbc4', TARGET ],
  COLOR_4         : [ '#8e1f2f', TARGET ],
  // COLOR_4         : [ '#2C6576', TARGET ],
  COLOR_5         : [ '#AB3574', TARGET ],
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

const TARGET1 = 'SECONDARY_9'
const TARGET2 = 'DARK_BROWN_1'

const rulesComplexWithTargets = {
  COLOR_BACK : [
    'BACK_6',
    'BACK_16',
  ],
  COLOR_SECONDARY : [
    'SECONDARY_2',
    'SECONDARY_7',
  ],
  COLOR_SELECTION : [
    'SELECTION_0',
    'SELECTION_1',
  ],
  COLOR_0 : [
    'navy.2',
    TARGET1,
  ],
  COLOR_1 : [
    'brown.8',
    TARGET1,
  ],
  COLOR_2 : [
    'blue.3',
    TARGET2,
  ],
  COLOR_3 : [
    'dark.green.2',
    TARGET2,
  ],
  COLOR_4 : [
    'orange.4',
    TARGET2,
  ],
  COLOR_5 : [
    'dark.pink.2',
    TARGET1,
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
    filePath     : filePathRandom[ 4 ],
    rules        : rulesComplexWithTargets,
    levels       : 12,
    rate         : 0.073,
    publishName  : 'advanced.ajax',
    publishIndex : 0,
  })
})
