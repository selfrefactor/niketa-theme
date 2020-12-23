const { missingColors } = require('../../lambdas/find_missing_rules/missingColors.json')

const BACK_COLOR = '#F8F8F8'
const INPUT_BACK = '#fafafa'
const CHROME_BRIGHTER = '#d1d1d1'
const CHROME_COLOR = '#c3c7cb'
const CHROME_COLOR_ACCENT = '#b0b6bf'
const DARK = '#083358'
const BORDER = '#76608a'
const WARNING = '#d13438'
const SOFT_WARNING = '#744da9'
const ACCENT_BACKGROUND = '#ea5c0055'
const SOFTER_ACCENT = '#834962'

const listColors = {
  // in change of themes
  'quickInput.background'            : INPUT_BACK,
  // in the circle of unsaved changes
  // in extensions preview
  'foreground'                       : '#24283b',
  // on drag and drop of folders
  'list.dropBackground'              : '#db82d688',
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

const menuColors = {
  'menu.border'                 : BORDER,
  'menu.background'             : BACK_COLOR,
  'menu.foreground'             : DARK,
  'menu.selectionBackground'    : `${ SOFTER_ACCENT }66`,
  'menu.selectionForeground'    : DARK,
  'menu.separatorBackground'    : `${ DARK }88`,
  'menubar.selectionBackground' : `${ SOFTER_ACCENT }66`,
  'menubar.selectionBorder'     : BORDER,
  'menubar.selectionForeground' : DARK,
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
  'editor.selectionBackground'           : `${ CHROME_COLOR }55`,
  'editor.selectionHighlightBackground'  : `${ CHROME_COLOR }77`,
  'editor.inactiveSelectionBackground'   : '#aaab9c66',
  // next two
  // When search by word is active or when double click on a word
  'editor.wordHighlightBackground'       : `${ WARNING }22`,
  'editor.wordHighlightStrongBackground' : ACCENT_BACKGROUND,
}

const peekView = {
  'peekView.border'                         : BORDER,
  'peekViewEditor.background'               : BACK_COLOR,
  'peekViewEditor.matchHighlightBackground' : '#3d59a155',
  'peekViewResult.background'               : BACK_COLOR,
  'peekViewResult.fileForeground'           : '#787c99',
  'peekViewResult.lineForeground'           : '#a9b1d6',
  'peekViewResult.matchHighlightBackground' : `${ WARNING }22`,
  'peekViewResult.selectionBackground'      : '#3d59a122',
  'peekViewResult.selectionForeground'      : DARK,
  'peekViewTitle.background'                : BACK_COLOR,
  'peekViewTitleDescription.foreground'     : '#787c99',
  'peekViewTitleLabel.foreground'           : '#a9b1d6',
}

const fromMissingColors = {
  'welcomePage.buttonHoverBackground'        : '#918415',
  'welcomePage.buttonBackground'             : '#918455',
  'editor.stackFrameHighlightBackground'     : '#ffffff',
  'textCodeBlock.background'                 : `${ SOFTER_ACCENT }22`,
  'peekViewEditorGutter.background'          : CHROME_COLOR_ACCENT,
  'settings.textInputBackground'             : CHROME_COLOR,
  'editorCodeLens.foreground'                : `${ DARK }99`,
  'statusBarItem.activeBackground'           : `${ SOFTER_ACCENT }55`,
  'statusBarItem.prominentBackground'        : `${ SOFTER_ACCENT }55`,
  'statusBarItem.prominentHoverBackground'   : CHROME_BRIGHTER,
  'notifications.background'                 : '#cacaca',
  // when using `exx` snippet
  'editor.snippetTabstopHighlightBackground' : ACCENT_BACKGROUND,
  'editorGroupHeader.tabsBorder'             : CHROME_COLOR_ACCENT,
  'editorGroup.border'                       : BORDER,
  'statusBar.noFolderBackground'             : BACK_COLOR,
  'statusBar.debuggingBackground'            : BACK_COLOR,
  'panel.border'                             : BORDER,
  'panel.background'                         : BACK_COLOR,
  'input.background'                         : INPUT_BACK,
  'input.foreground'                         : DARK,
  'input.border'                             : BORDER,
  'input.placeholderForeground'              : `${ DARK }88`,
  'debugToolBar.background'                  : BACK_COLOR,
  'titleBar.activeBackground'                : BACK_COLOR,
  'titleBar.activeForeground'                : DARK,
  'titleBar.inactiveBackground'              : CHROME_COLOR,
  'titleBar.inactiveForeground'              : BACK_COLOR,
  'dropdown.listBackground'                  : CHROME_COLOR,
  'dropdown.background'                      : CHROME_COLOR,
  'dropdown.border'                          : BORDER,
  'dropdown.foreground'                      : BACK_COLOR,
  'listFilterWidget.background'              : CHROME_COLOR,
  'listFilterWidget.noMatchesOutline'        : WARNING,
  'listFilterWidget.outline'                 : SOFT_WARNING,
  'inputValidation.infoBackground'           : CHROME_COLOR,
  'inputValidation.warningBackground'        : CHROME_COLOR,
  'editorGroupHeader.noTabsBackground'       : BACK_COLOR,
}

const breadcrumbs = {
  'breadcrumb.background'                : '#fdfdfd',
  'breadcrumbPicker.background'          : '#f1f1f1',
  'breadcrumb.activeSelectionForeground' : '#b53389',
  'breadcrumb.focusForeground'           : '#df3163',
  'breadcrumb.foreground'                : '#515670',
}

const dropBackground = '#b5338977'

const dropBackgrounds = {
  "editorGroup.dropBackground": dropBackground,
  "sideBar.dropBackground": dropBackground,
  "activityBar.dropBackground": dropBackground,
  "panel.dropBackground": dropBackground,
}

const possibleErrors={
  "editorIndentGuide.activeBackground": "#363b54",
  "editorPane.background": "#363b54",
  "notificationCenterHeader.background": "#101014",
  "activityBarBadge.foreground": "#141414",
  // when press f8 and you have code problem
  "editorMarkerNavigation.background": "#e7e7e7",
}

const newColors = {
  'sash.hoverBorder': '#387b54',
  'editorUnnecessaryCode.border': SOFT_WARNING
}

exports.chromeColors = {
  ...newColors,
  ...possibleErrors,
  ...dropBackgrounds,
  ...missingColors,
  ...fromMissingColors,
  ...breadcrumbs,
  ...peekView,
  ...menuColors,
  ...selectionColors,
  ...sidebarColors,
  ...suggestionsColors,
  ...listColors,
  'editor.background'                         : BACK_COLOR,
  'editor.foreground'                         : '#192112',
  'editor.lineHighlightBorder'                : '#9c824a',
  'editor.foldBackground'                     : '#fafafa',
  'activityBar.background'                    : '#C4BE9D',
  'badge.background'                          : '#e7e7e7',
  'badge.foreground'                          : '#3f7063',
  'diffEditor.insertedTextBackground'         : '#9c824a55',
  'diffEditor.removedTextBackground'          : '#64B5F655',
  'editor.findMatchBackground'                : '#aaff1144',
  'editor.findMatchHighlightBackground'       : '#71aac333',
  'editor.findRangeHighlightBackground'       : '#3f706344',
  'editor.lineHighlightBackground'            : BACK_COLOR,
  'editorBracketMatch.background'             : '#87775750',
  'editorBracketMatch.border'                 : BACK_COLOR,
  'editorCursor.foreground'                   : '#544',
  'terminal.background'                       : BACK_COLOR,
  'editorGroup.emptyBackground'               : BACK_COLOR,
  'tab.hoverBackground'                       : ACCENT_BACKGROUND,
  'editorGroupHeader.tabsBackground'          : CHROME_COLOR,
  'editorGutter.background'                   : `${ CHROME_COLOR }99`,
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
  'tab.activeBorderTop'                       : '#35495f',
  'tab.activeForeground'                      : '#35495f',
  'tab.border'                                : CHROME_COLOR_ACCENT,
  'tab.inactiveBackground'                    : CHROME_COLOR_ACCENT,
  'tab.inactiveForeground'                    : '#fff',
  'tab.unfocusedActiveBackground'             : BACK_COLOR,
  'tab.unfocusedActiveForeground'             : '#35495f',
  'tab.unfocusedActiveBorder'                 : '#35495fca',
  'tab.unfocusedInactiveForeground'           : '#555',
  'tab.unfocusedInactiveBackground'           : '#bbb',
  'tab.hoverForeground'                       : '#034694',
  'tab.unfocusedHoverForeground'              : '#3346a4',
  'widget.shadow'                             : '#8382aebb',
  'inputOption.activeForeground'              : '#323863',
}
