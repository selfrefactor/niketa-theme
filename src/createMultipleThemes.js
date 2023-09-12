const {
  CommunicationBreakdown,
  DancingDays,
  FunkyDrummer,
  GlassOnion,
  HelloSpaceboy,
  KozmicBlues,
  LedZeppelin,
  StrangeBrew,
  SweatLeaf,
} = require('./assets/themes-colors.js')
const { chromeColors } = require('./assets/chrome-colors.js')
const { createColorsHash } = require('./utils/create-colors-hash.js')
const { fromImportedTheme } = require('./from-imported-theme')
const { generateThemeData } = require('./bees/generateThemeData')
const { mapAsync } = require('rambdax')
const { outputJSON } = require('fs-extra')
const { readJsonAnt } = require('./ants/readJson')
const { resolve } = require('path')

const SETTINGS = [
  { CommunicationBreakdown },
  { DancingDays },
  { FunkyDrummer },
  { GlassOnion },
  { HelloSpaceboy },
  { KozmicBlues },
  { LedZeppelin },
  { StrangeBrew },
  { SweatLeaf },
]

function filterTokenColors(palette, start, end){
  if(
    typeof start !== 'number' ||
    typeof end !== 'number'
  ) return palette

  return {
    ...palette,
    tokenColors : palette.tokenColors.slice(start, end),
  }
}
let importedTheme
async function singleRun(themeSettings){
  const themesDirectory = resolve(__dirname, '../themes/')
  const [ [ themeName, colors ] ] = Object.entries(themeSettings)
  const palette = await readJsonAnt('palettes/palette.json')
  // importedTheme = await fromImportedTheme(1,30)
  let filteredPalette = filterTokenColors(palette)

  let themeData = generateThemeData({
    chrome : chromeColors,
    colors : createColorsHash(colors),
    palette: filteredPalette,
  })

  if(importedTheme){
    themeData = {
      ...themeData,
      tokenColors: [
        ...themeData.tokenColors,
        ...importedTheme,
      ]
    }
  }


  themeData.name = themeName

  await outputJSON(
    `${ themesDirectory }/${ themeName }.json`, themeData, { spaces : 2 }
  )
}

async function createMultipleThemes(){
  await mapAsync(async x => {
    await singleRun(x)
  })(SETTINGS)
}

exports.createMultipleThemes = createMultipleThemes
