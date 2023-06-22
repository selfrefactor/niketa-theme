const { missingColors } = require('../../lambdas/find_missing_rules/missingColors.json')
const { colors: importedChromeColors } = require('../assets/chrome-themes/theme.json')

const BACK_COLOR = '#fcfcfc'
const INPUT_BACK = '#fff'
const CHROME_BRIGHTER = '#eeeeee'
const CHROME_COLOR = '#e1e1e1'
const CHROME_COLOR_ACCENT = '#d1d1d1'
const DARK = '#000'
const BORDER = '#333'
const WARNING = '#d13438'
const SOFT_WARNING = '#744da9'
const ACCENT_BACKGROUND = '#ea5c0055'
const SOFTER_ACCENT = '#834962'

const TRANSPARENCY = '44'
const STRONG_TRANSPARENCY = '55'
const STRONGEST_TRANSPARENCY = '66'

const listColors = {
  'foreground'                       : DARK,
  'list.activeSelectionBackground'   : '#aaac',
  'list.activeSelectionForeground'   : '#4e4e4e',
  'list.dropBackground'              : '#b1b1b1dd',
  'list.errorForeground'             : '#bb1000',
  'list.filterMatchBackground'       : '#fff',
  'list.filterMatchBorder'           : '#fff',
  'list.focusBackground'             : '#0065FF33',
  'list.focusForeground'             : '#4e4e4e',
  'list.highlightForeground'         : '#00f',
  'list.hoverBackground'             : `${ CHROME_COLOR }aa`,
  'list.hoverForeground'             : DARK,
  'list.inactiveFocusBackground'     : `#11b1b1`,
  'list.inactiveSelectionBackground' : `#b1b111${TRANSPARENCY}`,
  'list.inactiveSelectionForeground' : `#333`,
  'list.invalidItemForeground'       : `#a9696A`,
  'list.warningForeground'           : `#ff854c`,
  'quickInput.background'            : '#fff',
  'quickInput.list.focusBackground'  : '#c3c3c3cc',
}

const sidebarColors = {
  'sideBar.background'              : CHROME_COLOR,
  'sideBar.foreground'              : '#333',
  'sideBar.border'                  : '#8382ae',
  'sideBarSectionHeader.background' : '#aebabe',
  'sideBarSectionHeader.foreground' : '#333',
  'sideBarSectionHeader.border'     : '#616161ca',
  'sideBarTitle.foreground'         : '#333',
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
  'editorSuggestWidget.selectedBackground'  : `#2c3d52${ TRANSPARENCY }`,
  'editorSuggestWidget.background'          : '#d1d3d4',
  'editorHoverWidget.background'            : '#d9d1d9',
  // when search with ctrl+f, this is widget chrome color
  'editorWidget.background'                 : CHROME_COLOR,
  // in autocomplete - the color of matched chars
  // i.e. if I write `co`, then suggest will be `const`
  // and the `co` will be in this color
  'editorSuggestWidget.highlightForeground' : '#c00',
  // in the above example, this is the color of the rest
  // also most common foreground color in autocomplete and suggestion
  'editorSuggestWidget.foreground'          : DARK,
  'editorSuggestWidget.border'              : '#d78d9f',
  'editorHoverWidget.border'                : '#d78d9f',
  'editorWidget.border'                     : '#d78d9f',
}
const selectionColors = {
  'editor.selectionBackground'           : `${ CHROME_COLOR }${ STRONG_TRANSPARENCY }`,
  'editor.selectionHighlightBackground'  : `${ CHROME_COLOR }${ STRONGEST_TRANSPARENCY }`,
  'editor.inactiveSelectionBackground'   : `#cccccc${ STRONG_TRANSPARENCY }`,
  'terminal.selectionBackground'         : `#cccccc${ STRONG_TRANSPARENCY }`,
  // next two
  // When search by word is active or when double click on a word
  'editor.wordHighlightBackground'       : `#44aaaa${ STRONG_TRANSPARENCY }`,
  'editor.wordHighlightStrongBackground' : `#44aaaa${ STRONGEST_TRANSPARENCY }`,
}

const peekView = {
  'peekView.border'                         : BORDER,
  'peekViewEditor.background'               : BACK_COLOR,
  'peekViewEditor.matchHighlightBackground' : '#3d59a122',
  'peekViewResult.background'               : BACK_COLOR,
  'peekViewResult.fileForeground'           : DARK,
  'peekViewResult.lineForeground'           : '#333',
  'peekViewResult.matchHighlightBackground' : `${ WARNING }22`,
  'peekViewResult.selectionBackground'      : '#3da9a122',
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
  'textCodeBlock.background'                 : `${ SOFTER_ACCENT }${ TRANSPARENCY }`,
  'peekViewEditorGutter.background'          : CHROME_COLOR_ACCENT,
  'settings.textInputBackground'             : CHROME_COLOR,
  'editorCodeLens.foreground'                : `${ DARK }${TRANSPARENCY}`,
  'statusBarItem.activeBackground'           : `${ SOFTER_ACCENT }${ STRONG_TRANSPARENCY }`,
  'statusBarItem.prominentBackground'        : `${ SOFTER_ACCENT }${ STRONG_TRANSPARENCY }`,
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
  'input.placeholderForeground'              : `${ DARK }${ STRONGEST_TRANSPARENCY }`,
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

const dropBackground = `#b53389${ STRONG_TRANSPARENCY }`

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
  'activityBarBadge.foreground'         : DARK,
  // when press f8 and you have code problem
  'editorMarkerNavigation.background'   : '#e7e7e7',
}

const newColors = {
  'sash.hoverBorder'             : '#387b54',
  'editorUnnecessaryCode.border' : SOFT_WARNING,
}
const notifications = {
  'notifications.foreground'  : DARK,
  'notifications.border'      : '#696c77',
  'notificationToast.border'  : '#771c1c',
  'notificationCenter.border' : '#771c1c',
  'notifications.background'  : '#cacaca',
}
const gitColors = {
  'gitDecoration.addedResourceForeground'         : DARK,
  'gitDecoration.conflictingResourceForeground'   : '#400',
  'gitDecoration.deletedResourceForeground'       : '#400',
  'gitDecoration.ignoredResourceForeground'       : '#400',
  // this dark is conflicting with dark background of inactive tabs
  'gitDecoration.modifiedResourceForeground'      : `#000070`,
  'gitDecoration.submoduleResourceForeground'     : `#004000`,
  'gitDecoration.untrackedResourceForeground'     : `#400040`,
  'gitDecoration.stageDeletedResourceForeground'  : `#404000`,
  'gitDecoration.stageModifiedResourceForeground' : `#404000`,
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
  'editorOverviewRuler.rangeHighlightForeground'      : '#a9b1d688',
  'editorOverviewRuler.selectionHighlightForeground'  : '#a9b1d644',
  'editorOverviewRuler.warningForeground'             : '#FFAB40',
  'editorOverviewRuler.wordHighlightForeground'       : '#bb9af755',
  'editorOverviewRuler.wordHighlightStrongForeground' : '#bb9af766',
}
const bracketColors = {
  'editorBracketMatch.background'      : '#1fffff44',
  'editorBracketMatch.border'          : BACK_COLOR,
  'editorBracketHighlight.foreground1' : '#008f00',
  'editorBracketHighlight.foreground2' : '#005f6b',
  'editorBracketHighlight.foreground3' : '#a70267',
  'editorBracketHighlight.foreground4' : '#ff3800',
  'editorBracketHighlight.foreground5' : '#2243b6',
  'editorBracketHighlight.foreground6' : '#c9a0ff',
}
const tabColors = {
  'tab.activeBackground'   : BACK_COLOR,
  'tab.activeBorder'       : BACK_COLOR,
  'tab.activeForeground'   : DARK,
  'tab.border'             : `${ CHROME_COLOR_ACCENT }${ TRANSPARENCY }`,
  'tab.inactiveBackground' : '#ddd',
  'tab.inactiveForeground' : `#333${ TRANSPARENCY }`,
}

const otherColors = {
  'terminalCursor.foreground' : DARK,
  'descriptionForeground'     : '#528ff0',
}

const niketaChromeColors = {
  ...newColors,
  ...tabColors,
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
  ...notifications,
  ...otherColors,
  'editorError.background'              : '#B73A3422',
  'editorError.border'                  : '#ffffff44',
  'editorError.foreground'              : '#511',
  'editorOverviewRuler.background'      : '#aaa', // color of scroll bar
  'editor.background'                   : BACK_COLOR,
  'editor.foreground'                   : DARK,
  'editor.lineHighlightBorder'          : '#e1e1e1',
  'editor.lineHighlightBackground'      : '#e1e1e1',
  'editor.foldBackground'               : '#fafafa',
  'activityBar.background'              : '#C4BE9D',
  'badge.background'                    : '#e7e7e7',
  'badge.foreground'                    : '#070',
  'diffEditor.insertedTextBackground'   : '#9c824a55',
  'diffEditor.removedTextBackground'    : '#64B5F655',
  'editor.findMatchBackground'          : '#aaff1144',
  'editor.findMatchHighlightBackground' : '#71aac322',
  'editor.findRangeHighlightBackground' : '#3f706333',
  'editorCursor.foreground'             : '#800',
  'terminal.background'                 : BACK_COLOR,
  'editorGroup.emptyBackground'         : BACK_COLOR,
  'tab.hoverBackground'                 : `#800000${ TRANSPARENCY }`,
  'editorGroupHeader.tabsBackground'    : CHROME_COLOR,
  'editorGutter.background'             : `${ CHROME_COLOR }99`,
  'editorLineNumber.foreground'         : '#2a3343a9',
  'editorLink.activeForeground'         : '#034694',
  'errorForeground'                     : '#B13',
  'focusBorder'                         : '#323e34',
  'git.color.modified'                  : '#4d0e0b',
  'scrollbar.shadow'                    : '#cf6f4b',
  'scrollbarSlider.background'          : `${ CHROME_COLOR }bb`,
  'scrollbarSlider.hoverBackground'     : '#C4BE9D',
  'selection.background'                : '#aba6a988',
  'statusBar.background'                : CHROME_COLOR,
  'statusBar.foreground'                : '#35495f',
  'widget.shadow'                       : '#8382ae',
  'inputOption.activeForeground'        : '#323863',
}

let mixedChromeColors = {
  ...importedChromeColors,
  ...selectionColors,
  ...notifications,
  ...listColors,
}

exports.chromeColors = mixedChromeColors
// exports.actualChromeColors = niketaChromeColors
// exports.chromeColors = importedChromeColors

exports.BACK_COLOR = BACK_COLOR
