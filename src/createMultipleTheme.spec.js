import {  map,  mapToObject } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { writeJsonAnt } from './ants/writeJson'
import { generateThemeData } from './bees/generateThemeData'

const CHROME_COLOR = '#cdd0d2'
const BACK_COLOR = '#F1F1F1'

const listColors = {
  // in change of themes
  // in the circle of unsaved changes
  // in extensions preview
  'foreground'                       : '#24283b',
  // on drag and drop of folders
  'list.dropBackground'              : '#db82d6cc',
  // when select theme, this is active theme background
  'list.focusBackground'             : '#6d50a188',
  'list.highlightForeground'         : '#4d0e0b',
  'list.inactiveFocusBackground'     : '#885f66cc',
  // when file is selected and then it turns inactive,
  // as code window became active
  'list.inactiveSelectionBackground' : '#eae3cd55',
  'list.inactiveSelectionForeground' : '#4d0e0b',
  // in the previous comment, this is when code window is not yet active
  'list.activeSelectionBackground'   : '#d1343822',
  // Right click on file in file explorer, this is foreground on hover
  'list.activeSelectionForeground'   : '#2a3343',
  // 'list.activeSelectionForeground'   : '#e7e7e7',
  // visible in autocomplete, in suggest, change of theme
  'list.hoverForeground'             : '#e7e7e7',
  'list.hoverBackground'             : '#ad680066',
}
const sidebarColors = {
  'sideBar.background'              : CHROME_COLOR,
  // It means the color of files in explorer, not yet modified
  // ============================================
  'sideBar.foreground'              : '#85483d',
  'sideBar.border'                  : '#8382ae',
  'sideBarSectionHeader.background' : '#aebabe',
  'sideBarSectionHeader.foreground' : '#2a3343',
  'sideBarTitle.foreground'         : '#30322e',
}

const suggestionsColors = {
  // in autocomplete box, the active line background
  'editorSuggestWidget.selectedBackground'  : '#2c3d5244',
  'editorSuggestWidget.background'          : '#d1d3d4',
  'editorHoverWidget.background'            : '#d1d3d4',
  // when search with ctrl+f, this is widget chrome color
  'editorWidget.background'                 : CHROME_COLOR,
  // in autocomplete - the color of matched chars
  // i.e. if I write `co`, then suggest will be `const`
  // and the `co` will be in this color
  'editorSuggestWidget.highlightForeground' : '#820014',
  // in the above example, this is the color of the rest
  // also most common foreground color in autocomplete and suggestion
  'editorSuggestWidget.foreground'          : '#2a3343',
  'editorSuggestWidget.border'              : '#d78d9f',
  'editorHoverWidget.border'                : '#d78d9f',
  'editorWidget.border'                     : '#d78d9f',
}
const selectionColors = {
  'editor.selectionBackground'          : `${ CHROME_COLOR }55`,
  'editor.selectionHighlightBackground' : `${ CHROME_COLOR }77`,
  'editor.inactiveSelectionBackground'  : '#aaab9c66',
}

const chromeColors = {
  ...selectionColors,
  ...sidebarColors,
  ...suggestionsColors,
  ...listColors,
  'editor.background'                         : BACK_COLOR,
  'editor.lineHighlightBorder'                : '#9c824a',
  // Above are missing in Niketa light theme
  // ============================================
  'editor.foldBackground'                     : '#fafafa',
  'activityBar.background'                    : '#C4BE9D',
  'badge.background'                          : '#e7e7e7',
  'badge.foreground'                          : '#3f7063',
  'diffEditor.insertedTextBackground'         : '#9c824a55',
  'diffEditor.removedTextBackground'          : '#64B5F655',
  'editor.findMatchBackground'                : '#87a192',
  'editor.findMatchHighlightBackground'       : '#71aac355',
  'editor.findRangeHighlightBackground'       : '#3f706366',
  'editor.lineHighlightBackground'            : BACK_COLOR,
  // next two
  // When search by word is active or when double click on a word
  'editor.wordHighlightBackground'            : '#aa769b55',
  'editor.wordHighlightStrongBackground'      : '#410a0b44',
  'editorBracketMatch.background'             : '#e7e7e7',
  'editorBracketMatch.border'                 : '#fafafa',
  'editorCursor.foreground'                   : '#544',
  'editorGroupHeader.tabsBackground'          : CHROME_COLOR,
  'editorLineNumber.foreground'               : '#2a3343a9',
  'editorLink.activeForeground'               : '#034694',
  'errorForeground'                           : '#B1365Bf3',
  'focusBorder'                               : '#525e54',
  'git.color.modified'                        : '#4d0e0b',
  'gitDecoration.modifiedResourceForeground'  : '#034694',
  'gitDecoration.addedResourceForeground'     : '#53245b',
  'gitDecoration.untrackedResourceForeground' : '#aa769b',
  'list.errorForeground'                      : '#a50044',
  'scrollbar.shadow'                          : '#cf6f4b',
  'scrollbarSlider.background'                : CHROME_COLOR,
  'scrollbarSlider.hoverBackground'           : '#C4BE9D',
  'selection.background'                      : '#ebe6d9',
  'statusBar.background'                      : CHROME_COLOR,
  'statusBar.foreground'                      : '#35495f',
  'tab.activeBackground'                      : BACK_COLOR,
  'tab.activeBorder'                          : '#35495f',
  'tab.activeForeground'                      : '#35495f',
  'tab.border'                                : CHROME_COLOR,
  'tab.inactiveBackground'                    : CHROME_COLOR,
  'tab.inactiveForeground'                    : '#fff',
  'tab.unfocusedActiveBackground'             : CHROME_COLOR,
  'tab.unfocusedActiveBorder'                 : CHROME_COLOR,
  'tab.unfocusedActiveForeground'             : '#aa769b',
  'widget.shadow'                             : '#8382aebb',
}

const CommunicationBreakdown = [
  '#b66ae4',
  '#480032',
  '#0068a8',
  '#38978D',
  '#B1365B',
]
// 'dancing.days',
// 'funky.drummer',
// 'glass.onion',
// 'hello.spaceboy',
// 'kozmic.blues',
// 'led.zeppelin',
// 'strange.brew',
// 'sweat.leaf',
const SETTINGS = [ { CommunicationBreakdown } ]
const palette = readJsonAnt('palettes/palette.json')

function createColorsHash(colors){
  if(colors.length !== 5) throw 'colors.length !== 5'

  return mapToObject(
    (color, i) => ({[`COLOR_${i}`]: color}),
    colors
  )
}

test('happy', () => {
  map(themeSettings => {
    const [[themeName, colors]] = Object.entries(themeSettings)

    const themeData = generateThemeData({
      palette,
      chrome: chromeColors,
      colors: createColorsHash(colors),
    })
    themeData.name = themeName
    writeJsonAnt(`themes/${ themeName }.json`, themeData)
  })(SETTINGS)
})
