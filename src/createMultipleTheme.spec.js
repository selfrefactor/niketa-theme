import { writeJsonAnt } from './ants/writeJson'
import { pascalCase } from 'string-fn'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { generateThemeDataBee } from './bees/generateThemeData'
import { createPaletteTheme, createPaletteRule } from './createPaletteTheme'
import { saveThemeBee } from './bees/saveTheme'
import { readJsonAnt } from './ants/readJson'
import { delay, range, pick, omit, switcher, maybe, map, mergeAll } from 'rambdax'

export const baseColors = {
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

const SETTINGS = {}
SETTINGS[ 0 ] = {
  mode    : 'advanced',
  label   : 'bat',
  COLOR_0 : '#B06775E9',
  COLOR_1 : '#54ABB5E9',
  COLOR_2 : '#CF6F4Bf3',
  COLOR_3 : '#8F1C3DE9',
}
SETTINGS[ 1 ] = {
  mode    : 'advanced',
  label   : 'cat',
  COLOR_0 : '#5a6598fa',
  COLOR_1 : '#B45948f1',
  COLOR_2 : '#6E3E53C6',
  COLOR_3 : '#861D4FCF',
  COLOR_4 : '#4381A8E9',
}

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

export function getChrome(mode){
  if (mode === 'advanced'){
    return {
      ...baseColors,
      'editor.background' : '#FAF8F3',
    }
  }
  if (mode === 'brave'){
    return {
      ...baseColors,
      'editor.background' : '#f3f0e0',
    }
  }
  if (mode === 'circus'){
    return {
      ...baseColors,
      'editor.background' : '#ede8e1',
    }
  }

  return {
    ...baseColors,
    'editor.background' : '#d8d5c9',
  }
}

test('happy', () => {
  map(
    ({mode,label, ...colors}) => {
      const paletteMode = maybe(
        colors.COLOR_5,
        'six',
        colors.COLOR_4 ? 'five' : maybe(
          colors.COLOR_3,
          'four',
          'three'
        )
      )
      const chrome = getChrome(mode)
      const palette = readJsonAnt(`palettes/${ paletteMode }.json`)
       const themeData = generateThemeDataBee({
        palette,
        chrome,
        colors
      }) 
      themeData.name = pascalCase(`${mode}.${label}`)
       console.log(themeData.name);

      writeJsonAnt(`themes/${themeData.name}.json`, themeData)
    }
  )(SETTINGS)
  const exported = readJsonAnt(
    'exported.json'
  )
  saveToPackageJsonAnt(exported)
})
