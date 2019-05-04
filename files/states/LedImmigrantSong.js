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
const MARK = [ '#aa00ff', '#aa00aa' ]
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
  COLOR_BACK      : [ '#f7f2f2', '#f7f2f2' ],
  COLOR_SECONDARY : [ translate('random.3'), translate('back.8') ],
  COLOR_SELECTION : [ translate('back.opacity.10'), fetchZero ],
  COLOR_0         : [ '#aa769b', '#fafafa' ],
  COLOR_1         : [ translate('dark.green.1'), translate('random.2') ],
  COLOR_2         : [ '#7E3231', translate('red.1') ],
  COLOR_3         : [ translate('red.1'), translate('back.8') ],
  COLOR_4         : [ '#20366b', '#c0c5c9' ],
  COLOR_5         : ['#00afd6ff','aa'],
  // COLOR_5         : ['#00BCD4D0','88'],
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
    publishName  : 'led.immigrant.song',
    publishIndex : 4,
  })
})

function getFilePathRandom(index){
  const found = `${ base }/generated/_${ index }.json`

  return found
}
