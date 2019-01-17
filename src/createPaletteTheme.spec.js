import {  createPaletteTheme } from './createPaletteTheme'

const base = '/home/s/repos/y/niketa-theme/palettes'
const filePath = `${ base }/more.json`
// const filePath = `${ base }/anime.json`
// const filePath = `${ base }/niketa-yellow.json`


test('palette', () => {
  
  const rules = {
    COLOR_BACK: ["#fafafa","#f9f6f1"],
    COLOR_SECONDARY: ["#ede8e1","#eaeaea"],
    COLOR_0: ["#DF897A", "#DF697A"],
    // COLOR_0: ["#aa769b", "#DF897A"],
    COLOR_1: ["#105e62","#13446F"],
    COLOR_2: ["#8fbbaf","#69779b"],
    COLOR_3: ["#BA8858", "#b5525c"],
    // COLOR_4: ["#34a7b2", "#1467b2"],
    COLOR_4: ["#3CD9BC","#34a7b2"],
    COLOR_5: ["#DE1758", "#d33682"],
  }

  createPaletteTheme({
    filePath,
    rules,
    levels: 12,
    rate: 0.1,
    publishName: 'angry.neighbour',
    publishIndex: 9
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