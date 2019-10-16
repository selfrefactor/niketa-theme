import { generateThemeDataBee } from './bees/generateThemeData'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { saveThemeBee } from './bees/saveTheme'
import { range, omit, maybe } from 'rambdax'
import { readJsonAnt } from './ants/readJson'
import { getChrome } from './createMultipleTheme.spec'

const SETTINGS_DEV = {
  mode    : 'advanced',
  COLOR_0 : '#063672',
  COLOR_1 : '#0068a8',
  COLOR_2 : '#7e9a64',
}

async function findBestTheme(){
  const chrome = getChrome(SETTINGS_DEV.mode)
  const paletteMode = maybe(
    SETTINGS_DEV.COLOR_5,
    {
      mode   : 'six',
      levels : 24,
    },
    SETTINGS_DEV.COLOR_4 ? {
      mode   : 'five',
      levels : 24,
    } : maybe(
      SETTINGS_DEV.COLOR_3,
      {
        mode   : 'four',
        levels : 20,
      },
      {
        mode   : 'three',
        levels : 6,
      }
    )
  )

  const toPackageJson = range(0, paletteMode.levels).map(i => {
    const palette = readJsonAnt(`palettes/${ paletteMode.mode }/_${ i }.json`)
    const themeData = generateThemeDataBee({
      palette,
      chrome,
      colors : omit('mode', SETTINGS_DEV),
    })

    const label = saveThemeBee(themeData, i)

    return {
      label,
      uiTheme : 'vs',
      path    : `./baboon/${ label }.json`,
    }
  })

  saveToPackageJsonAnt(toPackageJson)
}

test('find best pallete', async () => {
  await findBestTheme()
})
