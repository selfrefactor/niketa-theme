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
const { mapAsync } = require('rambdax')
const { generateThemeData } = require('./bees/generateThemeData')
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

async function singleRun(themeSettings){
  const themesDirectory = resolve(__dirname, '../themes/')
  const [ [ themeName, colors ] ] = Object.entries(themeSettings)
  const palette = await readJsonAnt('palettes/palette.json')

  const themeData = generateThemeData({
    palette,
    chrome : chromeColors,
    colors : createColorsHash(colors),
  })

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
