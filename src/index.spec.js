import { createTheme } from './'
import { createRulesBee } from './bees/createRules';

const base = '/home/s/repos/y/niketa-theme/bases'
const filePath = `${ base }/niketa-yellow.json`
const rules = {
  'editor.background'                   : [ '#C9DDE9', '#DBE3D6' ],
  'activityBar.background'              : [ '#cfd5dd', '#cfd5aa' ],
  'editor.selectionBackground'          : [ '#DDE6E0', '#C8D8E2' ],
  'editor.selectionHighlightBackground' : [ '#87A190', '#51636D' ],
}

test('createTheme', () => {
  const singleColorBase = {
    "editor.foreground": "#6688cc",
    "activityBar.background": "#cfd5dd",
    "editor.background": "#F9F6F1",
    // "editor.background": ["#ede8e1","#e7dfb1"],
    "editor.selectionBackground": "#50aaef",
    "editor.lineHighlightBackground": "#cfd5dd",
    "editorBracketMatch.background": "#2084d0",
    "editorBracketMatch.border": "#440b0b",
    "editorGroupHeader.tabsBackground": "#E3D9BB",
    "editorGutter.background": "#EADE9C",
    "editorLineNumber.foreground": "#c2aa4d",
    "scrollbarSlider.background": "#cfd5dd",
    "scrollbarSlider.hoverBackground": "#979788",
    "sideBar.background": "#cfd5dd",
    "statusBar.background": "#cfd5dd",
    "tab.activeForeground": "#440b0b",
    "tab.border": "#cfd5dd",
    "tab.inactiveBackground": "#cfd5dd",
    "tab.inactiveForeground": "#440b0b",
    "editor.selectionHighlightBackground": "#87a190"
  }
  const singleColor = createRulesBee(singleColorBase)

  createTheme({
    // random  : {},
    // random : {
    //   changes  : 4,
    //   distance : 3,
    //   indexes  : [ 1 ],
    // },
    filePath,
    rules: singleColor,
    levels  : 12,
    publish : {},
    publish : {
      index : 0,
      name  : 'aqua.ant',
    },
  })
  // cell glamour
})

test.skip('createTheme', () => {
  const result = createTheme({
    // random : {
    //   changes  : 1,
    //   distance : 6,
    //   indexes  : [ 0, 1 ],
    // },
    random  : {},
    filePath,
    rules,
    levels  : 12,
    // publish : {},
    publish : {
      index : 8,
      name  : 'aqua.shake',
    },
  })

  console.log({ result })
})
