import {  createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/more.json`
// const filePath = `${ base }/anime.json`
// const filePath = `${ base }/niketa-yellow.json`


// TODO
// ability to pass blue.light.1 instead of BLUE_LIGHT_1
// ============================================
test('palette with predefined colors', () => {
  
  const rules = {
    // COLOR_BACK: [
    //   "BACK_11",
    //   "SECONDARY_0",
    // ],
    COLOR_BACK: [
      "BACK_0",
      "BACK_6",
    ],
    COLOR_SECONDARY: [
      "SECONDARY_3",
      "SECONDARY_2",
    ],
    COLOR_SELECTION: [
      "SELECTION_0",
      "SELECTION_2",
    ],
    COLOR_1: [
      "orange.0",
      // "dark.purple.0",
      // "brown.6",
      "dark.brown.0",
    ], 
    COLOR_0: [
      "brown.5",
      // "dark.blue.3",
      "light.red.3",
    ],
    COLOR_3: [
      "dark.red.4",
      "orange.2",
      // "ochra.0",
    ], 
    COLOR_2: [
      "blue.0",
      "teal.4",
    ], 
    COLOR_5: [
      "dark.green.8",
      "dark.pink.3",
    ], 
    COLOR_4: [
      "brown.0",
      "red.0",
    ], 
  }

  createPaletteTheme({
    showList:true,
    complex: true,
    filePath,
    rules,
    levels:12,
    rate: 0.1,
    publishName: 'advanced.mice',
    publishIndex: 3
  })
})

test.skip('palette', () => {
  
  const rules = {
    // COLOR_BACK: "#fafafa",
    COLOR_BACK: ["#fafafa","#f9f6f1"],
    COLOR_SECONDARY: ["#ede8e1","#eae3cd"],
    COLOR_0: ["#d52484","#d52484"],
    COLOR_1: ["#105e62","#69779b"],
    COLOR_2: ["#729d39", "#f85e9f"],
    COLOR_3: ["#2a6171", "#009f9d"],
    COLOR_4: ["#841818", "#ae7c7c"],
    COLOR_5: ["#23a393", "#587850"],
  }

  createPaletteTheme({
    filePath,
    rules,
    levels: 12,
    rate: 0.09,
    publishName: 'brave.bat',
    publishIndex: 6
  })
})


test.skip('palette', () => {
  const rules = {
    COLOR_BACK: "#fafafa",
    COLOR_SECONDARY: "#DEE5E0",
    COLOR_0: "#aa769b",
    COLOR_1: "#85483D",
    COLOR_2: "#F26153",
    COLOR_3: "#BA8858",
    COLOR_4: "#21A68D",
    COLOR_5: "#5E7A5E",
  }
  
  createPaletteTheme({
    filePath,
    rules,
    rate: 0.05,
    // publishName: 'angry.cat'
  })
})