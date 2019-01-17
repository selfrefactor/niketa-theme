import {  createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/niketa-yellow.json`


test('palette', () => {
  const rules = {
    COLOR_BACK: ["#fafafa","#f9f6f1"],
    COLOR_SECONDARY: ["#DEE5E0", "#ede8e1"],
    COLOR_0: ["#aa769b", "#440b0b"],
    COLOR_1: "#85483D",
    COLOR_2: ["#F26153", "#d33682"],
    COLOR_3: ["#BA8858", "#c2aa4d"],
    COLOR_4: ["#21A68D","#00AFD6"],
    COLOR_5: "#5E7A5E",
  }
  
  createPaletteTheme({
    filePath,
    rules,
    levels: 12,
    rate: 0.1,
    publishName: 'angry.homer',
    publishIndex: 7
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