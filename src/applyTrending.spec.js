import { writeJsonAnt } from './ants/writeJson'
import { pascalCase } from 'string-fn'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { generateThemeDataBee } from './bees/generateThemeData'
import { readJsonAnt } from './ants/readJson'
import { maybe, map, defaultTo, replace, switcher } from 'rambdax'

const listAdvancedBraveCircus = {
  'list.activeSelectionBackground'   : '#eae3cd',
  'list.activeSelectionForeground'   : '#677d7f',
  'list.dropBackground'              : '#999a9d',
  'list.focusBackground'             : '#885f66aa',
  'list.highlightForeground'         : '#89345d',
  'list.hoverBackground'             : '#999a9d',
  'list.hoverForeground'             : '#f5f4e8',
  'list.inactiveSelectionBackground' : '#eae3cd55',
  'list.inactiveSelectionForeground' : '#30322e',
}
const listNiketa = {
  ...listAdvancedBraveCircus,
  'list.activeSelectionBackground'   : '#cacacc',
  'list.activeSelectionForeground'   : '#445a63',
  // 'list.dropBackground'              : '#c3c1a9',
  'list.focusBackground'             : '#978373d2',
  'list.highlightForeground'         : '#861d4f',
  // 'list.hoverForeground'             : '#fff',
  // 'list.hoverBackground'             : '#51676e',
  'list.inactiveSelectionBackground' : '#d1d3d4aa',
}

export const baseColors = {
  'git.color.modified'                        : '#a50044',
  'list.errorForeground'                      : '#a50044',
  'gitDecoration.modifiedResourceForeground'  : '#eae3cd',
  'gitDecoration.untrackedResourceForeground' : '#a50044',
  'activityBar.background'                    : '#C4BE9D',
  'badge.background'                          : '#aaa',
  'badge.foreground'                          : '#fafafa',
  'diffEditor.insertedTextBackground'         : '#9c824a55',
  'diffEditor.removedTextBackground'          : '#64B5F655',
  'editor.background'                         : '#FAF8F3',
  'editor.findMatchBackground'                : '#95a5a677',
  'editor.findMatchHighlightBackground'       : '#71aac355',
  'editor.findRangeHighlightBackground'       : '#3f706366',
  'editor.lineHighlightBackground'            : 'MAIN_COLOR25',
  'editor.lineHighlightBorderx'               : '#9a9b9411',
  'editor.selectionBackground'                : 'MAIN_COLOR55',
  'editor.selectionHighlightBackground'       : 'MAIN_COLOR88',
  'editor.wordHighlightBackground'            : 'MAIN_COLORaa',
  'editor.wordHighlightStrongBackground'      : 'MAIN_COLORdd',
  'editorBracketMatch.background'             : '#B1365Bf3',
  'editorBracketMatch.border'                 : '#9F7E6Bf3',
  'editorCursor.foreground'                   : '#544',
  'editorGroupHeader.tabsBackground'          : 'MAIN_COLOR',
  'editorLineNumber.foreground'               : '#2a3343a9',
  'editorLink.activeForeground'               : '#034694',
  'errorForeground'                           : '#B1365Bf3',
  'focusBorder'                               : '#525e54',
  // 'foreground'                           : '#B06775',
  'scrollbarSlider.background'                : 'MAIN_COLOR',
  'scrollbarSlider.hoverBackground'           : '#C4BE9D',
  'selection.background'                      : '#ebe6d9',
  'sideBar.background'                        : 'MAIN_COLOR',
  'sideBar.border'                            : '#445250c1',
  'sideBar.foreground'                        : '#f9f4f4',
  'sideBarSectionHeader.background'           : '#aebabee9',
  'sideBarSectionHeader.foreground'           : '#2a3343e9',
  'sideBarTitle.foreground'                   : '#30322ed1',
  'statusBar.background'                      : 'MAIN_COLOR',
  'statusBar.foreground'                      : '#35495f',
  'tab.activeBackground'                      : 'BACK_COLOR',
  'tab.activeBorder'                          : '#35495f',
  'tab.activeForeground'                      : '#35495f',
  'tab.border'                                : 'MAIN_COLOR',
  'tab.inactiveBackground'                    : 'MAIN_COLOR',
  'tab.inactiveForeground'                    : '#fff',
  'tab.unfocusedActiveBackground'             : 'MAIN_COLOR',
  'tab.unfocusedActiveBorder'                 : 'MAIN_COLOR',
  'tab.unfocusedActiveForeground'             : '#fff',
  'widget.shadow'                             : '#8382aebb',
}

function getBaseColors(mode, actualBack){
  const chromeMainColor = switcher(mode)
    .is('advanced', '#bdc3c7')
    .is('brave', '#bbc0c4')
    .is('circus', '#b7bcbf')
    .default('#b0b4b4')

  const listChrome = mode === 'niketa' ?
    listNiketa :
    listAdvancedBraveCircus

  const currentBase = {
    ...baseColors,
    ...listChrome,
  }
  const withMainColor = map(
    color => replace('MAIN_COLOR', chromeMainColor, color)
  )(currentBase)

  return map(
    color => replace('BACK_COLOR', actualBack, color)
  )(withMainColor)
}

export const SETTINGS = {}
SETTINGS[ 0 ] = {
  mode    : 'advanced',
  label   : 'bat',
  COLOR_0 : '#1A478D',
  COLOR_1 : '#E3158A',
  COLOR_2 : '#8DC0D4',
}

// chosen cat
// remove too blue colors
// no two blue colors
// min between is top prority
// with all colors.json that include also opacityless fn
SETTINGS[ 1 ] = {
  mode    : 'advanced',
  label   : 'cat',
  COLOR_0 : '#E0022A',
  COLOR_1 : '#5C1860',
  COLOR_2 : '#8DC0D4',
}
SETTINGS[ 2 ] = {
  mode    : 'advanced',
  label   : 'dog',
  COLOR_0 : '#2D410C',
  COLOR_1 : '#E0022A',
  COLOR_2 : '#8DC0D4',
}
// lemon song
SETTINGS[ 3 ] = {
  mode    : 'advanced',
  label   : 'engine',
  COLOR_0 : '#2D410C',
  COLOR_1 : '#E3158A',
  COLOR_2 : '#8DC0D4',
}
// heartbreaker
SETTINGS[ 4 ] = {
  mode    : 'advanced',
  label   : 'hook',
  COLOR_0 : '#2C226F',
  COLOR_1 : '#BAD867',
  COLOR_2 : '#1B7F9D',
}
// dancing days
SETTINGS[ 5 ] = {
  mode    : 'advanced',
  label   : 'immigrant',
  COLOR_0 : '#2C226F',
  COLOR_1 : '#BAD867',
  COLOR_2 : '#E3158A',
}

SETTINGS[ 6 ] = {
  mode    : 'advanced',
  label   : 'mystery',
  COLOR_0 : '#2C226F',
  COLOR_1 : '#D6C1E1',
  COLOR_2 : '#1B7F9D',
}
SETTINGS[ 7 ] = {
  mode    : 'brave',
  label   : 'habits',
  COLOR_0 : '#BAD867',
  COLOR_1 : '#E3158A',
  COLOR_2 : '#5C1860',
}
SETTINGS[ 8 ] = {
  mode    : 'brave',
  label   : 'homer',
  COLOR_0 : '#2C226F',
  COLOR_1 : '#E3158A',
  COLOR_2 : '#8DC0D4',
}
SETTINGS[ 9 ] = {
  mode    : 'brave',
  label   : 'love',
  COLOR_0 : '#2C226F',
  COLOR_1 : '#DD9FE2',
  COLOR_2 : '#1B7F9D',
}
// lemon song
SETTINGS[ 10 ] = {
  mode    : 'brave',
  label   : 'neighbour',
  COLOR_0 : '#2D410C',
  COLOR_1 : '#8DC0D4',
  COLOR_2 : '#1B7F9D',
}
SETTINGS[ 11 ] = {
  mode    : 'circus',
  label   : 'ajax',
  COLOR_0 : '#2D410C',
  COLOR_1 : '#1B7F9D',
  COLOR_2 : '#0DBDF1',
}
// label      : 'since.loving',
SETTINGS[ 12 ] = {
  back    : '#f9f6f1',
  mode    : 'circus',
  label   : 'brother',
  COLOR_0 : '#1B7F9D',
  COLOR_1 : '#702861',
  COLOR_2 : '#0DBDF1',
}
// label      : 'tea.for'
SETTINGS[ 13 ] = {
  back    : '#f9f6f1',
  mode    : 'circus',
  label   : 'people',
  COLOR_0 : '#9EADD0',
  COLOR_1 : '#1B7F9D',
  COLOR_2 : '#702861',
}
// label      : 'in.light',
SETTINGS[ 14 ] = {
  mode    : 'circus',
  label   : 'whisky',
  COLOR_0 : '#0B0A6B',
  COLOR_1 : '#0DBDF1',
  COLOR_2 : '#028B02',
}

SETTINGS[ 15 ] = {
  mode    : 'niketa',
  label   : 'owl',
  COLOR_0 : '#1B7F9D',
  COLOR_1 : '#C89ECB',
  COLOR_2 : '#0B0A6B',
}

SETTINGS[ 16 ] = {
  mode    : 'niketa',
  label   : 'bear',
  COLOR_0 : '#C66534',
  COLOR_1 : '#3c6e5b',
  COLOR_2 : '#532053',
}
SETTINGS[ 17 ] = {
  mode    : 'niketa',
  label   : 'moon',
  back    : '#c1bcae',
  COLOR_0 : '#696040',
  COLOR_1 : '#295879',
  COLOR_2 : '#7f0c29',
}
// WINNERS: bear & cat
const SOLE_BACKGROUND = '#FAF8F3'

export function getChrome(mode, back){
  const actualBack = defaultTo(SOLE_BACKGROUND, back)
  if (mode === 'advanced'){
    const baseToApply = getBaseColors(mode, actualBack)

    return {
      ...baseToApply,
      'editor.background' : actualBack,
    }
  }
  if (mode === 'brave'){
    const baseToApply = getBaseColors(mode, actualBack)

    return {
      ...baseToApply,
      'editor.background' : actualBack,
    }
  }

  if (mode === 'circus'){
    const baseToApply = getBaseColors(mode, actualBack)

    return {
      ...baseToApply,
      'editor.background' : actualBack,
    }
  }
  const baseToApply = getBaseColors(mode, actualBack)

  return {
    ...baseToApply,
    'editor.background' : actualBack,
  }
}

test('happy', () => {
  map(
    a => {
      const { mode, label, back, ...colors } = a
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
        colors,
      })
      themeData.name = pascalCase(`${ mode }.${ label }`)

      writeJsonAnt(`themes/${ themeData.name }.json`, themeData)
    }
  )(SETTINGS)

  const exported = readJsonAnt('exported.json')
  saveToPackageJsonAnt(exported)
  console.log(1)

  expect(
    1
  ).toBeTruthy()
})
