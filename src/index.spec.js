import { createTheme } from './'
import { createRulesBee } from './bees/createRules'
import { translate } from './ants/mini/translate'

const base = '/home/s/repos/niketa-theme/themes'
const filePath = `${ base }/AdvancedBat.json`

/*
  It allows to manipulate just the basic editor settings of published theme
*/
test('complex', () => {
  const singleColorBase = {
    'editor.background'                : [translate('back.17'), '#f39c12'],
    'activityBar.background'           : [translate('ochra.1'), translate('blue.2')],
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
  const singleColor = createRulesBee(singleColorBase)

  const createThemeFn = () => createTheme({
    random : {
      changes  : 1,
      distance : 5,
      indexes  : [ 0, 1 ],
    },
    filePath,
    rules  : singleColor,
    levels : 12,
    // publishName : '',
    // publishIndex : 5,
  })


  expect(
    () => createThemeFn()
  ).not.toThrow()
})

/*
  Change basic editor colors on random priciple with already published theme
*/
test.skip('with two colors', () => {
  const rules = {
    'editor.background'                   : [ '#C9DDE9', '#DBE3D6' ],
    'activityBar.background'              : [ '#cfd5dd', '#cfd5aa' ],
    'editor.selectionBackground'          : [ '#DDE6E0', '#C8D8E2' ],
    'editor.selectionHighlightBackground' : [ '#87A190', '#51636D' ],
  }

  const createThemeFn = () => createTheme({
    random : {
      changes  : 1,
      distance : 6,
      indexes  : [ 0, 1 ],
    },
    filePath,
    rules,
    levels : 22,
    // publishName : '',
    // publishIndex : 5,
  })

  expect(() => createThemeFn()).not.toThrow()
})
