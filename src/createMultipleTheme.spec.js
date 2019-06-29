import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { saveThemeBee } from './bees/saveTheme'
import { generateThemeDataBee } from './bees/generateThemeData'
import { delay, range, pick, omit, switcher, maybe, map, mergeAll } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { pascalCase } from 'string-fn'
import { writeJsonAnt } from './ants/writeJson'
import { resolve } from 'path'
import { createPaletteTheme, createPaletteRule } from './createPaletteTheme'

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

export function getChrome(mode){
  if (mode === 'advanced'){
    return {
      ...baseColors,
      'editor.background' : '#FAF8F3',
    }
  }

  return {
    ...baseColors,
    'editor.background' : '#FAF8F3',
  }
}

