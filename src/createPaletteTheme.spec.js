import { createPaletteTheme } from './createPaletteTheme'
import { translate, translatex } from './ants/mini/translate'
import { FetchTargetColor } from './ants/mini/fetchTargetColor'
const FetchTargetColorI = new FetchTargetColor({
  targetIndex : TARGET_INDEX(),
  targets     : TARGETS(),
})
const fetchZero = FetchTargetColorI.is(0)
const fetchOne = FetchTargetColorI.is(TARGET_ONLY_FIRST_FLAG() ? 0 : 1)
const RATE = 0.055 // applied to no opacity colors
function TARGETS(){
  return [ [ 'dark.brown.3', 'random.2' ], [ 'dark.0', 'grey.5' ],
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
}

function TARGET_ONLY_FIRST_FLAG(){ return false }
function TARGET_INDEX(){ return 4 }
const PALLETE_INDEX = 8
const PALLETE_RANDOM_FLAG = false

const rules = {
  COLOR_BACK      : [ translate('back_opacity.6'), '#9eb4ad' ],
  COLOR_SECONDARY : [ translate('special.7'), '#9eb4ad' ],
  COLOR_SELECTION : [ translate('red.opacity.3'), '#eae3cd' ],
  COLOR_0         : [ translate('dark.opacity.4'), fetchOne ],
  COLOR_1         : [ translate('blue.opacity.2'), fetchZero ],
  COLOR_2         : [ translate('green.opacity.2'), fetchZero ],
  COLOR_3         : [ translate('red.opacity.1'), fetchOne ],
  COLOR_4         : [ translate('dark.opacity.9'), fetchZero ],
  COLOR_5         : [ translate('yellow.opacity.4'), fetchZero ],
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
    rules,
    levels : 22,
    rate   : RATE,
    // publishName  : 'brave.homer',
    // publishIndex : 2,
  })
})

function getFilePathRandom(index){
  const found = `${ base }/generated/_${ index }.json`

  return found
}
