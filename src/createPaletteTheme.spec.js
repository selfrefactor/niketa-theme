import { createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/generated/foo.json`
const filePathRandom = `${ base }/generated/randomBar.json`

const rulesWithTwoColors = {
  COLOR_BACK      : [ '#f9f6ec', '#f9f1dc' ],
  COLOR_SECONDARY : [ '#e8e7e0', '#eae3cd' ],
  COLOR_SELECTION : [ '#abe5d6', '#eae3cd' ],
  COLOR_0         : [ '#085b60', '#46753D' ],
  COLOR_1         : [ '#BE5588', '#a22178' ],
  COLOR_2         : [ '#633258', '#fD8A6E' ],
  COLOR_3         : [ '#588859', '#13644c' ],
  COLOR_4         : [ '#94233D', '#fD8A6E' ],
  COLOR_5         : [ '#4086ad', '#880e4f' ],
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
    complex  : false,
    filePath : filePath,
    rules    : rulesWithTwoColors,
    levels   : 12,
    rate     : 0.07,
    // publishName  : 'niketa.moon',
    // publishIndex : 4,
  })
})
