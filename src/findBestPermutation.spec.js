import { writeJsonAnt } from './ants/writeJson'
import { permute } from './ants/permute.js'
import { pascalCase } from 'string-fn'
import { generateThemeDataBee } from './bees/generateThemeData'
import { readJsonAnt } from './ants/readJson'
import { themeNames } from './ants/themeNames.js'
import {
  map,
  mapAsync,
  range,
  delay,
  replace,
  shuffle,
  switcher,
  take,
} from 'rambdax'

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
  'list.focusBackground'             : '#978373d2',
  'list.highlightForeground'         : '#861d4f',
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
    , currentBase)

  return map(
    color => replace('BACK_COLOR', actualBack, color)
    , withMainColor)
}
const SOLE_BACKGROUND = '#ede8e1'
const THEME_COLORS = {
  COLOR_0 : '#399090',
  COLOR_1 : '#5c8875',
  COLOR_2 : '#0b032d',
  COLOR_4 : '#431a22',
  COLOR_3 : '#9e386a',
  COLOR_5 : '#783777',
}

function getCurrentColors(permutation){
  if (!permutation) return
  const toReturn = {}
  permutation.forEach(
    (key, i) => toReturn[ `COLOR_${ key }` ] = THEME_COLORS[ `COLOR_${ i }` ]
  )

  return toReturn
}

export function getChrome(mode){
  const baseToApply = getBaseColors(mode, SOLE_BACKGROUND)

  return {
    ...baseToApply,
    'editor.background' : SOLE_BACKGROUND,
  }
}

// Brave back - #f3f0e0
// Circus back - #ede8e1
// Niketa back - #d8d5c9

const getPermutation = permute(range(0, Object.keys(THEME_COLORS).length))

const permutationsRaw = range(0, 100)
  .map(() => getPermutation.next())
  .filter(Boolean)
const permutations = take(themeNames.length)(shuffle(permutationsRaw))

test('happy', async () => {
  let i = 0
  const permutationsToSave = {}
  await mapAsync(
    async ({ mode, label }) => {
      const currentPermutation = permutations[ i++ ]
      const colors = getCurrentColors(currentPermutation)
      if (!colors) return console.log(colors, currentPermutation, i)

      permutationsToSave[ `${ mode }.${ label }` ] = colors
      const chrome = getChrome(mode)
      const themeData = generateThemeDataBee({
        palette : readJsonAnt('palettes/six.json'),
        chrome,
        colors,
      })

      themeData.name = pascalCase(`${ mode }.${ label }`)
      themeData.colors = colors
      await delay(100)
      writeJsonAnt(`themes/${ themeData.name }.json`, themeData)
    },
    themeNames
  )

  writeJsonAnt('src/permutations.json', permutationsToSave)
})
