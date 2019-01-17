import {  createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/more.json`
// const filePath = `${ base }/anime.json`
// const filePath = `${ base }/niketa-yellow.json`


test('palette with predefined colors', () => {
  
  const rules = {
    COLOR_BACK: [
      "BACK_2",
      "BACK_5",
    ],
    COLOR_SECONDARY: [
      "SECONDARY_0",
      "SECONDARY_2",
    ],
    COLOR_SELECTION: [
      "SELECTION_0",
      "SELECTION_1",
    ],
    COLOR_0: [
      "DARK_RED_0",
      "PINK_1",
    ],
    COLOR_1: [
      "DARK_GREEN_0",
      "RANDOM_1",
    ], 
    COLOR_2: [
      "GREEN_2",
      "PINK_3",
    ], 
    COLOR_3: [
      "NAVY_0",
      "DARK_GREEN_2",
    ], 
    COLOR_4: [
      "RANDOM_0",
      "BROWN_0",
    ], 
    COLOR_5: [
      "LIGHT_BLUE_1",
      "GREEN_0",
    ], 
  }

  createPaletteTheme({
    complex: true,
    filePath,
    rules,
    levels: 12,
    rate: 0.09,
    // publishName: 'brave.whisky',
    // publishIndex: 6
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