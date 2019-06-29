import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { saveThemeBee } from './bees/saveTheme'
import { generateThemeDataBee } from './bees/generateThemeData'
import { delay, range, pick, omit, switcher, maybe, map, mergeAll } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { pascalCase } from 'string-fn'
import { writeJsonAnt } from './ants/writeJson'
import { resolve } from 'path'
import { createPaletteTheme, createPaletteRule } from './createPaletteTheme'

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

const SETTINGS_DEV = {
  mode    : 'advanced',
  COLOR_0 : '#063672',
  COLOR_1 : '#ff5177',
  COLOR_2 : '#7e9a64',
  COLOR_3 : '#0068a8',
}

const SETTINGS = {}
SETTINGS[ 0 ] = () => ({
  mode    : 'advanced',
  label   : 'bat',
  COLOR_0 : '#612e5d',
  COLOR_1 : '#ae8d60',
  COLOR_2 : '#7e9a64',
  COLOR_3 : '#35495f',
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

function getChrome(mode){
  if (mode === 'advanced'){
    return {
      ...baseColors,
      'editor.background'                : '#FAF8F3',
    }
  }
  return {
    ...baseColors,
    'editor.background'                : '#FAF8F3',
  }
}

function generateThemeData({ palette, chrome, colors }){
  const translatedColors = mergeAll(map(
    (color, prop) => createPaletteRule(prop, color)
  )(colors))

  const newTokenColors = map(
    tokenColor => {
      tokenColor.settings.foreground = translatedColors[ tokenColor.settings.foreground ]

      return tokenColor
    }
  )(palette.tokenColors)

  const newTheme = {
    ...palette,
    colors: chrome,
    tokenColors: newTokenColors
  }

  return newTheme
}

async function findBestTheme(){
  const chrome = getChrome(SETTINGS_DEV.mode)
  const paletteMode = maybe(
    SETTINGS_DEV.COLOR_5,
    {mode: 'six', levels: 24},
    SETTINGS_DEV.COLOR_4 ? {mode: 'five', levels: 24} : maybe(
      SETTINGS_DEV.COLOR_3,
      {mode: 'four', levels: 20},
      {mode: 'three', levels: 6}
    )
  )

  const toPackageJson = range(0,paletteMode.levels).map(i => {
    const palette = readJsonAnt(`palettes/${ paletteMode.mode }/_${i}.json`)
    const themeData = generateThemeData({
      palette,
      chrome,
      colors : omit('mode', SETTINGS_DEV),
    })

    const label = saveThemeBee(themeData, i)
    return {
      label,
      uiTheme : 'vs',
      path    : `./baboon/${ label }.json`,
    }
  })

  saveToPackageJsonAnt(toPackageJson)
}
 
test('find best pallete', async () => {
  await findBestTheme()
})

function getFilePathRandom(index, fourColors){
  if (!fourColors) return `${ base }/generated/threeColors.json`

  const found = `${ base }/generated/_${ index }.json`

  return found
}
