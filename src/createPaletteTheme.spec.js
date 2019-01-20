import {  createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/even.json`

test('palette with predefined colors', () => {
  const rules = {
    COLOR_BACK: [
      "#e4e1e1",
      "BACK_1",
    ],
    COLOR_SECONDARY: [
      "SECONDARY_2",
      "SECONDARY_5",
    ],
    COLOR_SELECTION: [
      "SELECTION_0",
      "SELECTION_2",
    ],
    COLOR_0: [
      "dark.3",
      "#4289B1",
    ],
    COLOR_1: [
      "#525050",
      "#54a620",
    ],
    COLOR_2: [
      "light.blue.2",
      "#188859",
    ], 
    COLOR_3: [
      "#C46493",
      "#C46493",
    ], 
    COLOR_4: [
      "#880E4F",
      "#880E4F",
    ], 
    COLOR_5: [
      "#f38b80",
      "#d52484",
    ], 
  }

  
  createPaletteTheme({
    // showList:true,
    complex: true,
    filePath,
    rules,
    levels:12,
    rate: 0.04,
    publishName: 'circus.love',
    publishName: 'advanced.engine',
    publishIndex: 8
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