const { missingColors } = require('../../lambdas/find_missing_rules/missingColors.json')

const BACK_COLOR = '#F5F5F5'
const INPUT_BACK = '#fafafa'
const CHROME_BRIGHTER = '#e1e1e1'
const CHROME_COLOR = '#c3c7cb'
const CHROME_COLOR_ACCENT = '#b0b6bf'
const DARK = '#083358'
const BORDER = '#433'
// const BORDER = '#76608a'
const WARNING = '#d13438'
const SOFT_WARNING = '#744da9'
const ACCENT_BACKGROUND = '#ea5c0055'
const SOFTER_ACCENT = '#834962'

const listColors = {
  'foreground'                       : '#24283b',
  'list.activeSelectionBackground'   : '#aaa',
  'list.activeSelectionForeground'   : '#4e4e4e',
  'list.dropBackground'              : '#b1b1b11e',
  'list.errorForeground'             : '#bb1000',
  'list.filterMatchBackground'       : '#fff',
  'list.filterMatchBorder'           : '#fff',
  'list.focusBackground'             : '#0065FF33',
  'list.focusForeground'             : '#4e4e4e',
  'list.highlightForeground'         : '#4283F5',
  'list.hoverBackground'             : '#4332',
  // 'list.hoverForeground'             : '#4e4e4e', // no need
  'list.inactiveFocusBackground'     : '#11b1b155',
  'list.inactiveSelectionBackground' : '#b1b11155',
  'list.inactiveSelectionForeground' : '#4e4e4e',
  'list.invalidItemForeground'       : '#A9A9AA',
  'list.warningForeground'           : '#ff854c',
  'quickInput.background'            : INPUT_BACK,
  'quickInput.list.focusBackground'  : '#5554',
}

const sidebarColors = {
  'sideBar.background'              : CHROME_COLOR,
  'sideBar.foreground'              : '#85483d',
  'sideBar.border'                  : '#8382ae',
  'sideBarSectionHeader.background' : '#aebabe',
  'sideBarSectionHeader.foreground' : '#2a3343',
  'sideBarSectionHeader.border'     : '#616161ca',
  'sideBarTitle.foreground'         : '#30322e',
}

const menuColors = {
  'menu.border'                 : BORDER,
  'menu.background'             : BACK_COLOR,
  'menu.foreground'             : DARK,
  'menu.selectionBackground'    : `${ SOFTER_ACCENT }66`,
  'menu.selectionForeground'    : DARK,
  'menu.separatorBackground'    : `${ DARK }55`,
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
  'tree.tableColumnsBorder'                  : '#12f8f2',
  'tree.indentGuidesStroke'                  : '#f1f',
  'tree.tableOddRowsBackground'              : '#55555577',
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
  'editorGroup.dropBackground' : dropBackground,
  'sideBar.dropBackground'     : dropBackground,
  'activityBar.dropBackground' : dropBackground,
  'panel.dropBackground'       : dropBackground,
}

const possibleErrors = {
  'editorIndentGuide.activeBackground'  : '#363b54',
  'editorPane.background'               : '#363b5477',
  'notificationCenterHeader.background' : '#10101477',
  'activityBarBadge.foreground'         : '#141414',
  // when press f8 and you have code problem
  'editorMarkerNavigation.background'   : '#e7e7e7',
}

const newColors = {
  'sash.hoverBorder'             : '#387b54',
  'editorUnnecessaryCode.border' : SOFT_WARNING,
}
const notifications = {
  'notifications.foreground'  : '#53245b',
  'notifications.border'      : '#696c77',
  'notificationToast.border'  : '#771c1c',
  'notificationCenter.border' : '#771c1c',
  'notifications.background'  : '#cacaca',
  //   notificationCenterHeader.foreground
  // #ad4848
}
const gitColors = {
  'gitDecoration.addedResourceForeground'         : '#53245b',
  'gitDecoration.conflictingResourceForeground'   : '#bb7a61',
  'gitDecoration.deletedResourceForeground'       : '#914c54',
  'gitDecoration.ignoredResourceForeground'       : '#515670',
  'gitDecoration.modifiedResourceForeground'      : '#034694',
  'gitDecoration.submoduleResourceForeground'     : '#8af899',
  'gitDecoration.untrackedResourceForeground'     : '#aa769b',
  'gitDecoration.stageDeletedResourceForeground'  : '#aa769b',
  'gitDecoration.stageModifiedResourceForeground' : '#aa769b',
}

/**
 * scrollbar colors of edited content
 */
const editorRuler = {
  'editorOverviewRuler.addedForeground'               : '#47ffa0',
  'editorOverviewRuler.border'                        : '#ff000040',
  'editorOverviewRuler.bracketMatchForeground'        : '#40C4FF40',
  'editorOverviewRuler.commonContentForeground'       : '#474e6c',
  'editorOverviewRuler.currentContentForeground'      : '#535664',
  'editorOverviewRuler.deletedForeground'             : '#E040FBa0',
  'editorOverviewRuler.errorForeground'               : '#FF5252',
  'editorOverviewRuler.findMatchForeground'           : '#a9b1d6a4',
  'editorOverviewRuler.incomingContentForeground'     : '#859900a0',
  'editorOverviewRuler.infoForeground'                : '#FFFF00a0',
  'editorOverviewRuler.modifiedForeground'            : '#40C4FFa0',
  'editorOverviewRuler.rangeHighlightForeground'      : '#a9b1d644',
  'editorOverviewRuler.selectionHighlightForeground'  : '#a9b1d622',
  'editorOverviewRuler.warningForeground'             : '#FFAB40',
  'editorOverviewRuler.wordHighlightForeground'       : '#bb9af755',
  'editorOverviewRuler.wordHighlightStrongForeground' : '#bb9af766',
}
const bracketColors = {
  'editorBracketMatch.background'      : '#1fffff44',
  'editorBracketMatch.border'          : BACK_COLOR,
  'editorBracketHighlight.foreground1' : '#e477e4',
  'editorBracketHighlight.foreground2' : '#FFAB40',
  'editorBracketHighlight.foreground3' : '#40C4FF',
  'editorBracketHighlight.foreground4' : '#474e6c',
  'editorBracketHighlight.foreground5' : '#914c54',
  'editorBracketHighlight.foreground6' : '#bb9af7',
}
exports.chromeColorsxx = {}
exports.chromeColors = {
  ...newColors,
  ...bracketColors,
  ...editorRuler,
  ...gitColors,
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
  'editorOverviewRuler.background'      : '#eaeaea', // color of scroll bar
  'editor.background'                   : BACK_COLOR,
  'editor.foreground'                   : '#192112',
  'editor.lineHighlightBorder'          : '#e1e1e1',
  'editor.lineHighlightBackground'      : '#e1e1e1',
  'editor.foldBackground'               : '#fafafa',
  'activityBar.background'              : '#C4BE9D',
  'badge.background'                    : '#e7e7e7',
  'badge.foreground'                    : '#3f7063',
  'diffEditor.insertedTextBackground'   : '#9c824a55',
  'diffEditor.removedTextBackground'    : '#64B5F655',
  'editor.findMatchBackground'          : '#aaff1144',
  'editor.findMatchHighlightBackground' : '#71aac333',
  'editor.findRangeHighlightBackground' : '#3f706344',
  'editorCursor.foreground'             : '#544',
  'terminal.background'                 : BACK_COLOR,
  'editorGroup.emptyBackground'         : BACK_COLOR,
  'tab.hoverBackground'                 : ACCENT_BACKGROUND,
  'editorGroupHeader.tabsBackground'    : CHROME_COLOR,
  'editorGutter.background'             : `${ CHROME_COLOR }99`,
  'editorLineNumber.foreground'         : '#2a3343a9',
  'editorLink.activeForeground'         : '#034694',
  'errorForeground'                     : '#B1365B',
  'focusBorder'                         : '#323e34',
  'git.color.modified'                  : '#4d0e0b',
  // 'list.errorForeground'                      : '#a50044',
  'scrollbar.shadow'                    : '#cf6f4b',
  'scrollbarSlider.background'          : CHROME_COLOR,
  'scrollbarSlider.hoverBackground'     : '#C4BE9D',
  'selection.background'                : '#ebe6d9',
  'statusBar.background'                : CHROME_COLOR,
  'statusBar.foreground'                : '#35495f',
  'tab.activeBackground'                : BACK_COLOR,
  'tab.activeBorder'                    : '#35495f',
  'tab.activeBorderTop'                 : '#35495f',
  'tab.activeForeground'                : '#35495f',
  'tab.border'                          : CHROME_COLOR_ACCENT,
  'tab.inactiveBackground'              : CHROME_COLOR_ACCENT,
  'tab.inactiveForeground'              : '#fff',
  'tab.unfocusedActiveBackground'       : BACK_COLOR,
  'tab.unfocusedActiveForeground'       : '#35495f',
  'tab.unfocusedActiveBorder'           : '#35495f',
  'tab.unfocusedInactiveForeground'     : '#555',
  'tab.unfocusedInactiveBackground'     : '#bbb',
  'tab.hoverForeground'                 : '#034694',
  'tab.unfocusedHoverForeground'        : '#3346a4',
  'widget.shadow'                       : '#8382ae',
  'inputOption.activeForeground'        : '#323863',
}
