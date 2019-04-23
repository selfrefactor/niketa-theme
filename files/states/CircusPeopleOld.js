import { createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/niketa-theme/palettes'
const filePath = `${ base }/generated/foo.json`
const filePathRandom = [
  `${ base }/generated/randomFoo.json`,
  `${ base }/generated/randomBar.json`,
  `${ base }/generated/randomBaz.json`,
]

const rulesWithTwoColors = {
  COLOR_BACK      : [ '#f1f1dd', '#f6f6d6' ],
  COLOR_SECONDARY : [ '#D9D4BA', '#a6aBaF' ],
  COLOR_SELECTION : [ '#abe5d6', '#eae3cd' ],
  COLOR_0         : [ '#cd7c55', '#1b7ca3' ],
  COLOR_1         : [ '#36456F', '#36451F' ],
  COLOR_2         : [ '#79753C', '#85483d' ],
  COLOR_3         : [ '#c83a71', '#13644c' ],
  COLOR_4         : [ '#3EA8C4', '#5078a4' ],
  COLOR_5         : [ '#C50E36', '#ae7c7c' ],
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
    // showList:true,
    complex      : false,
    filePath     : filePathRandom[ 0 ],
    rules        : rulesWithTwoColors,
    levels       : 12,
    rate         : 0.07,
    publishName  : 'circus.people',
    publishIndex : 2,
  })
})
