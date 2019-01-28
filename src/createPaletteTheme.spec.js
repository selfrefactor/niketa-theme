import {  createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/even.json`

test('palette with predefined colors', () => {
  const rules = {
    COLOR_BACK: [
      "#d8d5c9",
      "#d8d5c9",
    ],
    COLOR_SECONDARY: [
      "SECONDARY_9",
      "SECONDARY_7",
    ],
    COLOR_SELECTION: [
      "SELECTION_2",
      "SELECTION_1",
    ],
    COLOR_0: [
      "dark.green.0",
      "purple.3",
    ], 
    COLOR_1: [
      "brown.1",
      "brown.0",
    ],
    COLOR_2: [
      "blue.2",
      "light.blue.7",
    ],
    COLOR_3: [
      "green.7",
      "green.7",
    ], 
    COLOR_4: [
      "dark.pink.6",
      "dark.pink.6",
    ], 
    COLOR_5: [
      "dark.green.3",
      "dark.green.3",
    ], 
  }
  
  createPaletteTheme({
    // showList:true,
    complex: true,
    filePath,
    rules,
    levels:12,
    rate: 0.04,
    publishName: 'advanced.owl',
    publishIndex: 4
  })
})


test.skip('palette', () => {
  
  const rules = {
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
    // publishName: 'brave.bat',
    // publishIndex: 6
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