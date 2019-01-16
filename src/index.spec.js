import { createTheme, createPaletteTheme } from './'
import { createRulesBee } from './bees/createRules'

const base = '/home/s/repos/y/niketa-theme/bases'
const palette = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/niketa-yellow.json`
const filePathPalette = `${ palette }/niketa-yellow.json`
const rules = {
  'editor.background'                   : [ '#C9DDE9', '#DBE3D6' ],
  'activityBar.background'              : [ '#cfd5dd', '#cfd5aa' ],
  'editor.selectionBackground'          : [ '#DDE6E0', '#C8D8E2' ],
  'editor.selectionHighlightBackground' : [ '#87A190', '#51636D' ],
}

test('palette', () => {
  const singleColorBase = {
    COLOR_BACK: "#ede8e1",
    COLOR_SECONDARY: "#ccd5d1",
    COLOR_0: "#aa769b",
    COLOR_1: "#9aa61b",
    COLOR_2: "#1a769b",
    COLOR_3: "#5a245f",
    COLOR_4: "#fa5989",
    COLOR_5: "#1fa654",
  }
  
  const singleColor = createRulesBee(singleColorBase)
  createPaletteTheme({
    boring: true,
    random : {
      changes  : 1,
      distance : 3,
      indexes  : [ 1 ],
    },
    filePath: filePathPalette,
    rules   : singleColor,
    levels  : 12,
  })
})

test.skip('createTheme', () => {
  const singleColorBase = {
    "activityBar.background": ["#ece3e7",'#e9fbe2'],
		"activityBar.foreground": "#076b6b",
		"activityBarBadge.background": "#88385b",
		"badge.background": "#64b6b6",
		"button.background": "#88385b",
		"diffEditor.insertedTextBackground": "#00ffbf25",
		"diffEditor.removedTextBackground": "#ff000d17",
		"dropdown.background": "#ffffff",
		"dropdown.foreground": "#076b6b",
		"dropdown.listBackground": "#ffffff",
		"editor.background": "#fffdfe",
		"editor.findMatchBackground": "#fffd7a",
		"editor.findMatchHighlightBackground": "#fffd7a94",
		"editor.findRangeHighlightBackground": "#fffd7a41",
		"editor.foreground": "#4b1034",
  }
  const singleColor = createRulesBee(singleColorBase)

  createTheme({
    // random  : {},
    // random : {
    //   changes  : 1,
    //   distance : 3,
    //   indexes  : [ 0,1 ],
    // },
    filePath,
    rules   : singleColor,
    levels  : 12,
    publish : {},
    // publish : {
    //   index : 0,
    //   name  : 'curious.sea',
    // },
  })
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

// const singleColorBasex = {
//   'editor.background'                   : [ '#e9fbe2', '#d6d6c6' ],
//   // "editor.background": ["#ede8e1","#e7dfb1"],
// }