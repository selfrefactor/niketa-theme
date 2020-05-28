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
const { find, headObject, shuffle, mapAsync } = require('rambdax')
const { generateThemeData } = require('./bees/generateThemeData')
const { outputJSON } = require('fs-extra')
const { readJsonAnt } = require('./ants/readJson')
const { resolve } = require('path')

const FIRST_THEME = 'CommunicationBreakdown'

const SPIN_LABEL = false
// const SPIN_LABEL = 'FunkyDrummer'

const SETTINGS_ORIGIN = [
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

const SETTINGS = SETTINGS_ORIGIN.map(x => {
  const { prop } = headObject(x)

  if (SPIN_LABEL && prop === FIRST_THEME){
    const found = find(y => {
      const { prop: yProp } = headObject(y)

      return yProp === SPIN_LABEL
    })(SETTINGS_ORIGIN)
    if (!found) return x

    const { value: foundValue } = headObject(found)

    const spinned = shuffle(foundValue)
    outputJSON(`${ __dirname }/spinned.json`, spinned)

    return { [ prop ] : spinned }
  }
  if (prop === SPIN_LABEL) return x

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
