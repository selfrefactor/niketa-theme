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
const { generateThemeData } = require('./bees/generateThemeData')
const { headObject, shuffle, mapAsync } = require('rambdax')
const { outputJSON } = require('fs-extra')
const { readJsonAnt } = require('./ants/readJson')
const { resolve } = require('path')

const SPIN_LABEL = false
// const SPIN_LABEL = 'CommunicationBreakdown'

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
].map(x => {
  const { prop, value } = headObject(x)
  if (SPIN_LABEL && prop === SPIN_LABEL){
    const spinned = shuffle(value)

    return { [ prop ] : spinned }
  }

  return x
})

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
