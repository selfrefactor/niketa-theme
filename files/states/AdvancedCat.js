import { createPaletteTheme } from './createPaletteTheme'
import { translate, translatex } from './ants/mini/translate'
import { MAX_LEVELS } from './bees/saveTheme'
import { FetchTargetColor } from './ants/mini/fetchTargetColor'

const targetOptions = {
  targetIndex : TARGET_INDEX(),
  opacityFlag : TARGET_OPACITY(),
  targets     : [ OPACITY_TARGETS(), TARGETS() ],
}

const FetchTargetColorI = new FetchTargetColor(targetOptions)

const fetchZero = FetchTargetColorI.is(0)
const fetchOne = FetchTargetColorI.is(TARGET_ONLY_FIRST_FLAG() ? 0 : 1)
const RATE = 0.065 // applied to no opacity colors

function OPACITY_TARGETS(){
  return [
    [ '39', '90' ],
    [ 'f1', '77' ],
    [ 'a0', 'c9' ],
    [ 'ba', 'ed' ],
  ]
}
const MARK = [ '#aa00ff', '#aa00ff' ]
function TARGETS(){
  return [
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
}

function TARGET_OPACITY(){ return true }
function TARGET_ONLY_FIRST_FLAG(){ return true }
function TARGET_INDEX(){ return 2 }
const PALLETE_INDEX = 17 // 29 is max
const PALLETE_RANDOM_FLAG = true

const rules = {
  COLOR_BACK      : [ translate('back.opacity.14'), translate('back.opacity.14') ],
  COLOR_SECONDARY : [ translate('special.10'), translate('special.10') ],
  COLOR_SELECTION : [ translate('back.opacity.10'), fetchZero ],
  // COLOR_0         : [ translate('special.7'), '53' ],
  COLOR_0         : [ translate('dark.red.5'), translate('teal.1') ],
  COLOR_1         : [ translate('yellow.opacity.5'), translate('yellow.opacity.5') ],
  COLOR_2         : [ translate('dark.opacity.9'), translate('dark.opacity.2') ],
  COLOR_3         : [ '#21A68D', '#aaA68D' ],
  COLOR_4         : [ translate('red.opacity.2'), '66' ],
  COLOR_5         : [ translate('blue.opacity.6'), translate('blue.opacity.6') ],
}

const base = '/home/s/repos/niketa-theme/palettes'
test('happy', () => {

  createPaletteTheme({
    showList : false,
    complex  : true,
    filePath : PALLETE_RANDOM_FLAG ?
      getFilePathRandom(PALLETE_INDEX) :
      `${ base }/generated/boring.json`,
    rules,
    levels : MAX_LEVELS,
    rate   : RATE,
    publishName  : 'advanced.cat',
    publishIndex : 14,
  })
})

function getFilePathRandom(index){
  const found = `${ base }/generated/_${ index }.json`

  return found
}
