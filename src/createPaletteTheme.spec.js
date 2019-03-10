import { createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/generated/foo.json`

const rulesWithTwoColors = {
  COLOR_BACK      : [ '#f9f7f5', '#f9f6f1' ],
  COLOR_SECONDARY : [ '#ebe5d6', '#eae3cd' ],
  COLOR_SELECTION : [ '#abe5d6', '#eae3cd' ],
  COLOR_0         : [ '#46758D', '#46753D' ],
  COLOR_1         : [ '#C22178', '#C22178' ],
  COLOR_2         : [ '#729d39', '#3f8b6e' ],
  COLOR_3         : [ '#9a4e4e', '#009f9d' ],
  COLOR_4         : [ '#841818', '#1c2c5b' ],
  COLOR_5         : [ '#a31393', '#d13438' ],
}

const rulesWithOneColor = {
  COLOR_BACK      : '#f9f7f5',
  COLOR_SECONDARY : '#ebe5d6',
  COLOR_SELECTION : '#a1a1a1',
  COLOR_0         : '#46758D',
  COLOR_1         : '#9a4e4e',
  COLOR_2         : '#7E4040',
  COLOR_3         : '#3f8b6e',
  COLOR_4         : '#7E4040',
  COLOR_5         : '#C22178',
}

const rules = {
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
    'orange.0',
  ],
  COLOR_1 : [
    'dark.blue.0',
    'blue.3',
  ],
  COLOR_2 : [
    'green.3',
    'green.3',
  ],
  COLOR_3 : [
    'brown.2',
    'brown.2',
  ],
  COLOR_4 : [
    'red.3',
    'pink.1',
  ],
  COLOR_5 : [
    'purple.2',
    'purple.2',
  ],
}

test('palette with predefined colors', () => {

  createPaletteTheme({
    // showList:true,
    complex : false,
    filePath,
    // rules,
    // rules: rulesWithOneColor,
    rules   : rulesWithTwoColors,
    levels  : 12,
    rate    : 0.05,
    // publishName  : 'niketa.moon',
    // publishIndex : 4,
  })
})
