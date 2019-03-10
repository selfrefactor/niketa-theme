import { createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/generated/foo.json`

test('palette with predefined colors', () => {
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

  createPaletteTheme({
    // showList:true,
    complex : true,
    filePath,
    rules,
    levels  : 12,
    rate    : 0.04,
    // publishName  : 'niketa.moon',
    // publishIndex : 4,
  })
})

const rulesWithTwoColors = {
  COLOR_BACK      : [ '#fafafa', '#f9f6f1' ],
  COLOR_SECONDARY : [ '#ede8e1', '#eae3cd' ],
  COLOR_0         : [ '#d52484', '#d52484' ],
  COLOR_1         : [ '#105e62', '#69779b' ],
  COLOR_2         : [ '#729d39', '#f85e9f' ],
  COLOR_3         : [ '#2a6171', '#009f9d' ],
  COLOR_4         : [ '#841818', '#ae7c7c' ],
  COLOR_5         : [ '#23a393', '#587850' ],
}

const rulesWithOneColor = {
  COLOR_BACK      : '#fafafa',
  COLOR_SECONDARY : '#DEE5E0',
  COLOR_0         : '#aa769b',
  COLOR_1         : '#85483D',
  COLOR_2         : '#F26153',
  COLOR_3         : '#BA8858',
  COLOR_4         : '#21A68D',
  COLOR_5         : '#5E7A5E',
}
