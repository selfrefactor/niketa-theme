import {  createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/noctis.json`
// const filePath = `${ base }/more.json`

test('palette with predefined colors', () => {
  const rules = {
    COLOR_BACK: [
      "#c1bcae",
      "#c1bcae",
    ],
    COLOR_SECONDARY: [
      "SECONDARY_6",
      "SECONDARY_7",
    ],
    COLOR_SELECTION: [
      "SELECTION_0",
      "SELECTION_0",
    ],
    COLOR_0: [
      "orange.3",
      "light.yellow.1",
    ], 
    COLOR_1: [
      'dark.blue.3',
    "#1470d0",
    // "#a470a0",
      // "orange.0",
      // "red.3",
    ],
    COLOR_2: [
      "#4c824a",
      "blue.3",
    ],
    COLOR_3: [
      "dark.brown.3",
      "brown.2",
    ], 
    COLOR_4: [
      "pink.1",
      "brown.3",
    ], 
    COLOR_5: [
      "dark.red.2",
      "dark.red.4",
    ], 
  }
  
  createPaletteTheme({
    // showList:true,
    complex: true,
    filePath,
    rules,
    levels:12,
    rate: 0.04,
    publishName: 'niketa.moon',
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