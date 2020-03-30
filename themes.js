import { map, maybe } from 'rambdax'
import { pascalCase } from 'string-fn'

import { readJsonAnt } from './ants/readJson'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { writeJsonAnt } from './ants/writeJson'
import { generateThemeDataBee } from './bees/generateThemeData'

const CHROME_COLOR = '#cdd0d2'
const BACK_COLOR = '#FAF8F3'

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

export const SETTINGS = {}

SETTINGS[ 0 ] = {
  // COLOR_1 : '#6d3e54',
  // COLOR_4 : '#4c5d3d',
  // COLOR_4 : '#7e995b',
  mode    : 'advanced',
  label   : 'bat',
  COLOR_0 : '#20639b',
  COLOR_1 : '#249ef5',
  COLOR_2 : '#CF6F4B',
  COLOR_3 : '#8F1C3D',
  COLOR_4 : '#480032',
}
SETTINGS[ 1 ] = {
  mode    : 'advanced',
  label   : 'cat',
  // COLOR_5 : '#6d3e54',
  // COLOR_5 : '#192112',
  COLOR_0 : '#1e7abc',
  COLOR_1 : '#192112',
  COLOR_2 : '#9d254d',
  COLOR_3 : '#1E416E',
  COLOR_4 : '#B97444',
}
SETTINGS[ 2 ] = {
  mode    : 'advanced',
  label   : 'dog',
  // COLOR_4 : '#4381A8',
  // COLOR_4 : '#a6723d',
  // COLOR_2 : '#6E3E53',
  // COLOR_2 : '#38978D',
  // COLOR_4 : '#5a6598',
  COLOR_0 : '#28305d',
  COLOR_1 : '#d86a98',
  COLOR_2 : '#861D4F',
  // COLOR_2 : '#617c42',
  // COLOR_3 : '#3659a5',
}
SETTINGS[ 3 ] = {
  mode    : 'advanced',
  label   : 'engine',
  // COLOR_0 : '#533963',
  // COLOR_1 : '#7F8E52',
  // COLOR_3 : '#5e337d',
  COLOR_0 : '#af3564',
  COLOR_1 : '#C26F63',
  COLOR_2 : '#2c91af',
  COLOR_4 : '#38978D',
  COLOR_3 : '#1c2f52',
}
SETTINGS[ 4 ] = {
  mode    : 'advanced',
  label   : 'hook',
  // COLOR_0 : '#a24b2b',
  // COLOR_0 : '#835095',
  // COLOR_4 : '#bb4741',
  // COLOR_4 : '#c03546',
  // COLOR_4 : '#6d1f36',
  COLOR_0 : '#285ea6',
  COLOR_1 : '#ca417d',
  COLOR_2 : '#192112',
  COLOR_3 : '#614ad3',
  COLOR_4 : '#906387',
}
SETTINGS[ 5 ] = {
  mode    : 'advanced',
  label   : 'immigrant',
  // COLOR_1 : '#947e3e',
  // COLOR_0 : '#0068a8',
  // COLOR_1 : '#ff5177',
  // COLOR_0 : '#063672',
  COLOR_1 : '#b1336b',
  COLOR_0 : '#b1336b',
  COLOR_4 : '#b1336b',
  COLOR_2 : '#3866d5',
  COLOR_3 : '#b76144',
}
SETTINGS[ 6 ] = {
  mode    : 'advanced',
  label   : 'mystery',
  // COLOR_0 : '#9e4f34',
  // COLOR_2 : '#8e3996',
  // COLOR_2 : '#c8498a',
  // COLOR_0 : '#BD2E63',
  COLOR_0 : '#508546',
  COLOR_1 : '#E9630D',
  COLOR_2 : '#880e4f',
  COLOR_3 : '#6856da',
  COLOR_4 : '#20366b',
}
SETTINGS[ 7 ] = {
  mode    : 'brave',
  label   : 'habits',
  // COLOR_1 : '#855b3c',
  // COLOR_0 : '#D27837',
  // COLOR_0 : '#6a3951',
  // COLOR_2 : '#fe5e53',
  COLOR_0 : '#3b6160',
  COLOR_1 : '#3463bc',
  COLOR_2 : '#5a2779',
  COLOR_3 : '#cf455c',
  COLOR_4 : '#b66ae4',
}
SETTINGS[ 8 ] = {
  mode    : 'brave',
  label   : 'homer',
  // COLOR_3 : '#B84251',
  // COLOR_5 : '#884b50',
  // COLOR_0 : '#621b66',
  COLOR_0 : '#335776',
  COLOR_1 : '#bb9132',
  COLOR_4 : '#d44578',
  COLOR_2 : '#080c11',
  COLOR_3 : '#3782AF',
}
SETTINGS[ 9 ] = {
  mode    : 'brave',
  label   : 'love',
  // COLOR_2 : '#3b6160',
  // COLOR_3 : '#a12b6d',
  // COLOR_2 : '#3f9072',
  COLOR_0 : '#9b5636',
  COLOR_1 : '#4b085f',
  COLOR_2 : '#0068a8',
  COLOR_3 : '#780662',
  COLOR_4 : '#0d1016',
}

SETTINGS[ 10 ] = {
  mode    : 'brave',
  label   : 'neighbour',
  // COLOR_2 : '#d45079',
  // COLOR_0 : '#b7472a',
  // COLOR_3 : '#216353',
  COLOR_0 : '#00a8cc',
  COLOR_3 : '#38978D',
  COLOR_1 : '#1E416E',
  COLOR_2 : '#a12b6d',
  COLOR_4 : '#323232',
}
SETTINGS[ 11 ] = {
  mode    : 'circus',
  label   : 'ajax',
  // COLOR_0 : '#51214f',
  // COLOR_0 : '#431a22',
  // COLOR_0 : '#a0512c',
  // COLOR_3 : '#c88f5a',
  COLOR_0 : '#c8337d',
  COLOR_1 : '#2e7173',
  COLOR_2 : '#783777',
  COLOR_3 : '#0b032d',
  COLOR_4 : '#2939ca',
}
SETTINGS[ 12 ] = {
  mode    : 'circus',
  label   : 'brother',
  // COLOR_2 : '#c85044',
  COLOR_0 : '#28305d',
  COLOR_1 : '#7e995b',
  COLOR_2 : '#6c48c4',
  COLOR_3 : '#953b69',
  // COLOR_3 : '#B1365B',
}
SETTINGS[ 13 ] = {
  mode    : 'circus',
  label   : 'people',
  // COLOR_2 : '#b56e30',
  // COLOR_0 : '#89325f',
  // COLOR_4 : '#d03a75',
  COLOR_0 : '#b13695',
  COLOR_4 : '#6833b9',
  COLOR_1 : '#5F7E97',
  COLOR_2 : '#884c4c',
  COLOR_3 : '#356a6d',
}
SETTINGS[ 14 ] = {
  mode    : 'circus',
  label   : 'whisky',
  COLOR_0 : '#083358',
  COLOR_1 : '#b24826',
  // COLOR_1 : '#A0595E',
  COLOR_2 : '#5a245f',
  COLOR_3 : '#0d8a81',
  COLOR_4 : '#31266d',
  // COLOR_4 : '#5c6773',
}

SETTINGS[ 15 ] = {
  // COLOR_2 : '#ce5371',
  // COLOR_3 : '#216479',
  mode    : 'niketa',
  label   : 'owl',
  COLOR_0 : '#d239a0',
  COLOR_1 : '#0031df',
  COLOR_2 : '#2f586f',
  // COLOR_2 : '#df5831',
  COLOR_4 : '#2c323a',
  COLOR_3 : '#8c7647',
}
SETTINGS[ 16 ] = {
  // COLOR_1 : '#532053',
  // COLOR_2 : '#98414f',
  mode    : 'niketa',
  label   : 'bear',
  COLOR_0 : '#527ecc',
  COLOR_1 : '#222d60',
  COLOR_2 : '#a83c56',
  COLOR_3 : '#51978f',
  COLOR_4 : '#b5603e',
  COLOR_5 : '#1c44ac',
}   
SETTINGS[ 17 ] = {
  // COLOR_3 : '#828d83',
  // COLOR_4 : '#82397e',
  mode    : 'niketa',
  label   : 'moon',
  COLOR_0 : '#2b4dd2',
  COLOR_1 : '#855b3c',
  COLOR_2 : '#3a0088',
  // COLOR_2 : '#ad145b',
  COLOR_3 : '#01676b',
  COLOR_4 : '#900048',
}

test('happy', () => {
  map(val => {
    const { mode, label, back, ...colors } = val
    const paletteMode = maybe(
      colors.COLOR_5,
      'six',
      colors.COLOR_4 ? 'five' : maybe(
        colors.COLOR_3, 'four', 'three'
      )
    )
    const palette = readJsonAnt(`palettes/${ paletteMode }.json`)
    const themeData = generateThemeDataBee({
      palette,
      chrome : chromeColors,
      colors,
    })
    themeData.name = pascalCase(`${ mode }.${ label }`)

    writeJsonAnt(`themes/${ themeData.name }.json`, themeData)
  })(SETTINGS)

  const exported = readJsonAnt('exported.json')
  saveToPackageJsonAnt(exported)
})
