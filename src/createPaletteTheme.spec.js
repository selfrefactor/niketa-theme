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
      "BACK_4",
      "BACK_7",
    ],
    COLOR_SECONDARY: [
      "SECONDARY_3",
      "SECONDARY_2",
    ],
    COLOR_SELECTION: [
      "SELECTION_1",
      "SELECTION_0",
    ],
    COLOR_0: [
      "DARK_RED_1",
      "LIGHT_RED_3",
    ], 
    COLOR_1: [
      "BLUE_2",
      "grey.4",
    ],
    COLOR_2: [
      "navy.2",
      "LIGHT_PINK_0",
    ], 
    COLOR_3: [
      "PINK_4",
      "DARK_PINK_3",
    ], 
    COLOR_4: [
      "DARK_GREEN_8",
      "GREEN_0",
    ], 
    COLOR_5: [
      "LIGHT_BROWN_0",
      "LIGHT_RED_0",
    ], 
  }

  createPaletteTheme({
    // showList:true,
    complex: true,
    filePath,
    rules,
    levels: 12,
    rate: 0.08,
    // publishName: 'circus.people',
    // publishIndex: 4
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