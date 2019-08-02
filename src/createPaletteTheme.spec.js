import { resolve } from 'path'
import { createPaletteTheme } from './createPaletteTheme'

const PALLETE_INDEX = 2 // 29 is max
const PALLETE_RANDOM_FLAG = true

const rules = {
  COLOR_BACK      : [ '#dcdcd3', '#9eb4ad' ],
  COLOR_SECONDARY : [ '#A5A9A1', '#9eb4ad' ],
  COLOR_SELECTION : [ '#eec2bb', '#eae3cd' ],
  COLOR_2         : [ '#df5831', '#df5831' ],
  COLOR_4         : [ '#df5831', '#df5831' ],
  COLOR_0         : [ '#2F586F', '#2F586F' ],
  COLOR_1         : [ '#8c7647', '#8c7647' ],
  COLOR_3         : [ '#8c7647', '#8c7647' ],
  COLOR_5         : [ '#2F586F', '#2F586F' ],
}

const base = resolve(__dirname, '../palettes')

test('happy', () => {
  createPaletteTheme({
    complex  : true,
    filePath : PALLETE_RANDOM_FLAG ?
      getFilePathRandom(PALLETE_INDEX) :
      `${ base }/generated/boring.json`,
    rules,
    // publishName  : 'led.immigrant.song',
    // publishIndex : 4,
  })
})

function getFilePathRandom(index){
  const found = `${ base }/generated/_${ index }.json`

  return found
}
