const { generateThemeData } = require('./bees/generateThemeData')
const { mapToObject, delay } = require('rambdax')
const { outputJSON } = require('fs-extra')
const { readJsonAnt } = require('./ants/readJson')
const { resolve } = require('path')

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
/*
  COLOR_0 is barely visible
*/
const CommunicationBreakdown = [
  '#b66ae4',
  '#480032',
  '#0068a8',
  '#38978D',
  '#B1365B',
]
const DancingDays = [ '#b13695', '#38978D', '#614ad3', '#083358', '#df5831' ]
const FunkyDrummer = [ '#b66ae4', '#480032', '#0068a8', '#38978D', '#B1365B' ]
const GlassOnion = [ '#bb9132', '#20366b', '#2c91af', '#861D4F', '#E9630D' ]

const HelloSpaceboy = [ '#01676b', '#6833b9', '#b1336b', '#192112', '#0031df' ]
const KozmicBlues = [ '#a83c56', '#28305d', '#0068a8', '#d239a0', '#b66ae4' ]
const LedZeppelin = [ '#0d8a81', '#00a8cc', '#a12b6d', '#d44578', '#3a0088' ]
const StrangeBrew = [ '#00a8cc', '#222d60', '#953b69', '#b24826', '#01676b' ]

const SweatLeaf = [ '#2f586f', '#a83c56', '#0031df', '#d239a0', '#bb9132' ]

const SETTINGS = [
  { LedZeppelin },
  { SweatLeaf },
  { HelloSpaceboy },
  { CommunicationBreakdown },
  { GlassOnion },
  { DancingDays },
  { FunkyDrummer },
  { KozmicBlues },
  { StrangeBrew },
]
const palette = readJsonAnt('palettes/palette.json')

function createColorsHash(colors){
  if (colors.length !== 5) throw 'colors.length !== 5'

  return mapToObject((color, i) => ({ [ `COLOR_${ i }` ] : color }), colors)
}

const themesDirectory = resolve(__dirname, '../themes/')

async function singleRun(themeSettings){
  const [ [ themeName, colors ] ] = Object.entries(themeSettings)

  const themeData = generateThemeData({
    palette,
    chrome : chromeColors,
    colors : createColorsHash(colors),
  })
  themeData.name = themeName
  await outputJSON(
    `${ themesDirectory }/${ themeName }.json`, themeData, { spaces : 2 }
  )
}

void (async function createThemes(){
  const index = Number(process.env.INDEX)
  if (SETTINGS[ index ] === undefined) return console.log('!index')

  await singleRun(SETTINGS[ index ])
})()
