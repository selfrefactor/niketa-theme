import { editThemeChrome } from './'
import { resolve } from 'path'
import { createRules } from '../mini/createRules'
import { translate } from '../mini/translate'

const base = resolve(__dirname,'../../../themes')

const filePath = `${base}/BraveHomer.json`

/*
  It allows to manipulate just the basic editor settings of published theme
*/
test.skip('with one or two colors', () => {
  const singleColorBase = {
    'editor.background'                : [ translate('back.17'), '#f39c12' ],
    'activityBar.background'           : [ translate('ochra.1'), translate('blue.2') ],
    'editor.selectionBackground'       : '#ffe0e0',
    'editor.lineHighlightBackground'   : '#e3e4d7',
    'editorBracketMatch.background'    : '#55978B',
    'editorBracketMatch.border'        : '#7C3939',
    'editorGroupHeader.tabsBackground' : '#E6DCC2',
    'editorGutter.background'          : '#f2ede0',
    'editorLineNumber.foreground'      : '#C2C4A7',
    'scrollbarSlider.background'       : '#e3e4d7',
    'scrollbarSlider.hoverBackground'  : '#C2C4A7',
    'sideBar.background'               : '#D2D4BF',
    'statusBar.background'             : '#D2D4BF',
    'tab.activeForeground'             : '#4E5F52',
    'tab.activeBackground'             : '#C2C4A7',
    'tab.inactiveForeground'           : '#4E5F52',
    'tab.inactiveBackground'           : '#D2D4BF',
    'tab.border'                       : '#D2D4BF',
  }
  const singleColor = createRules(singleColorBase)

  const createThemeFn = () => editThemeChrome({
    random : {
      changes  : 1,
      distance : 5,
      indexes  : [ 0, 1 ],
    },
    filePath,
    rules  : singleColor,
    levels : 12,
  })

  expect(
    () => createThemeFn()
  ).not.toThrow()
})

/*
  Change basic editor colors on random priciple with already published theme
*/
test('with static color pairs', () => {
  const rules = { 'editor.background' : [ '#2A3343', '#1a1a16' ] }

  const createThemeFn = () => editThemeChrome({
    random : {
      changes  : 1,
      distance : 3,
      indexes  : [ 0, 1 ],
    },
    filePath,
    rules,
    levels : 22,
  })

  expect(() => createThemeFn()).not.toThrow()
})
