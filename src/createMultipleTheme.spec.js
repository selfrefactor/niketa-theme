import { delay, range, pick, omit } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { pascalCase } from 'string-fn'
import { writeJsonAnt } from './ants/writeJson'
import { resolve } from 'path'
import { createPaletteTheme } from './createPaletteTheme'

const RATE = 0.052 // applied to no opacity colors

const PALLETE_INDEX = 1 // 9 is max

const baseRules = {
  COLOR_SECONDARY : '#cccdc5f1',
  COLOR_SELECTION : '#94525755',
}

function createRules(x){
  if (x.fourColors){
    return {
      ...baseRules,
      COLOR_BACK : '#f9f6f1',
      ...omit('fourColors', x),
    }
  }
  const color0 = x.COLOR_0
  const color1 = x.COLOR_1
  const color2 = x.COLOR_2
  const colorBackRaw = x.yellowBack ?
    '#eee8e0' :
    '#ede8e1'

  const colorBack = x.brightBack ?
    '#f9f6f1' :
    colorBackRaw

  return {
    ...baseRules,
    COLOR_BACK : colorBack,
    COLOR_0    : color0,
    COLOR_3    : color0,
    COLOR_1    : color1,
    COLOR_4    : color1,
    COLOR_2    : color2,
    COLOR_5    : color2,
  }
}

const baseColors = {
  'diffEditor.removedTextBackground'  : '#64B5F655',
  'diffEditor.insertedTextBackground' : '#9c824a55',
  'activityBar.background'            : '#cccdc5f1',
  'editor.selectionBackground'        : '#94525755',
  'editorBracketMatch.background'     : '#B1365Bf3',
  'editorBracketMatch.border'         : '#9F7E6Bf3',
  'editorGroupHeader.tabsBackground'  : '#F2EBE1',
  'editorLineNumber.foreground'       : '#2a3343a9',
  'scrollbarSlider.background'        : '#cccdc5f1',
  'scrollbarSlider.hoverBackground'   : '#cccdc5f3',
  'sideBar.background'                : '#cccdc5f3',
  'statusBar.background'              : '#cccdc5f3',
  'editor.lineHighlightBackground'    : '#F2EBE1',
  'tab.inactiveForeground'            : '#fafafa',
  'tab.inactiveBackground'            : '#859da9e9',
  'tab.activeForeground'              : '#2a3343e9',
}

const base = resolve(__dirname, '../palettes')

const SETTINGS = {}
// To test all palletes
// ============================================
SETTINGS.DEV = () => ({
  fourColors : true,
  COLOR_0    : '#063672',
  COLOR_1    : '#ff5177',
  COLOR_2    : '#b76144',
  COLOR_3    : '#0068a8',
})

SETTINGS[ 0 ] = () => ({
  label      : 'dancing.days',
  fourColors : true,
  COLOR_0    : '#612e5d',
  COLOR_1    : '#ae8d60',
  COLOR_2    : '#7e9a64',
  COLOR_3    : '#35495f',
})

// Old version
// ============================================
// SETTINGS[ 0 ] = () => ({
//   yellowBack : true,
//   brightBack : true,
//   label      : 'dancing.days',
//   COLOR_0    : '#612e5d',
//   COLOR_1    : '#ae8d60',
//   COLOR_2    : '#7e9a64',
// })

SETTINGS[ 1 ] = () => ({
  yellowBack : true,
  brightBack : true,
  label      : 'heartbreaker',
  COLOR_0    : '#9C8058',
  COLOR_1    : '#f26153',
  COLOR_2    : '#096165',
})
SETTINGS[ 2 ] = () => ({
  yellowBack : true,
  brightBack : true,
  label      : 'in.light',
  COLOR_0    : '#A0595E',
  COLOR_1    : '#3782AF',
  COLOR_2    : '#0d8a81',
})
SETTINGS[ 3 ] = () => ({
  yellowBack : false,
  brightBack : true,
  label      : 'lemon.song',
  COLOR_0    : '#1E416E',
  COLOR_1    : '#38978D',
  COLOR_2    : '#B97444',
})
SETTINGS[ 4 ] = () => ({
  yellowBack : false,
  brightBack : true,
  label      : 'since.loving',
  COLOR_0    : '#B1365B',
  COLOR_1    : '#5F7E97',
  COLOR_2    : '#9F7E6B',
})
SETTINGS[ 5 ] = () => ({
  yellowBack : false,
  brightBack : true,
  label      : 'tea.for',
  COLOR_0    : '#89325f',
  COLOR_1    : '#b56e30',
  COLOR_2    : '#356a6d',
})

function createSingleTheme(index){
  return new Promise(resolve => {
    const toReturn = SETTINGS[ index ]()
    const actualRules = createRules(toReturn)
    const callback = () => resolve(toReturn)
    const filePath = getFilePathRandom(PALLETE_INDEX, toReturn.fourColors)

    const options = {
      complex : false,
      filePath,
      rules   : actualRules,
      rate    : RATE,
      callback,
    }

    createPaletteTheme(options)
  })
}

function createFourColorTheme(index){
  return new Promise(resolve => {
    const settings = SETTINGS.DEV()
    const actualRules = createRules(settings)

    const callback = () => resolve(settings)
    const filePath = getFilePathRandom(index, settings.fourColors)

    const options = {
      complex : false,
      filePath,
      rules   : actualRules,
      rate    : RATE,
      callback,
    }
    console.log(options)

    createPaletteTheme(options)
  })
}

test.skip('try all palletes', done => {
  jest.setTimeout(60000)
  const loop = range(0,6)
  const correction = 12
  // No more than six palletes
  // ============================================
  const promised = loop.map(i => new Promise(resolve => {

    delay(2000 * i).then(() => {
      createFourColorTheme(i + correction).then(() => {
        const { label } = SETTINGS[ i ]()
        const source = readJsonAnt('baboon/BaboonAnt.json')
        source.name = 'Zeppelin' + pascalCase(label)
        source.colors = {
          ...source.colors,
          ...baseColors,
        }
        writeJsonAnt(`themes/Zeppelin${ pascalCase(label) }.json`, source)
        resolve()
      })
    })
  }))

  Promise.all(promised).then(() => done())
})

test.skip('export all', done => {
  jest.setTimeout(60000)
  const promised = range(0, 1).map(i => new Promise(resolve => {

    delay(2000 * i).then(() => {
      createSingleTheme(i).then(({ label }) => {
        const source = readJsonAnt('baboon/BaboonAnt.json')
        source.name = 'Zeppelin' + pascalCase(label)
        source.colors = {
          ...source.colors,
          ...baseColors,
        }
        writeJsonAnt(`themes/Zeppelin${ pascalCase(label) }.json`, source)
        resolve()
      })
    })
  }))

  Promise.all(promised).then(() => done())
})

function getFilePathRandom(index, fourColors){
  if (!fourColors) return `${ base }/generated/threeColors.json`

  const found = `${ base }/generated/_${ index }.json`

  return found
}
