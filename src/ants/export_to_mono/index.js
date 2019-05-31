import { readJsonAnt, resolve } from '../readJson'
import { namesHash } from '../../bees/saveTheme'
import { resolve as resolveMethod } from 'path'
import { existsSync, readFileSync } from 'fs'
import { replace, remove, log } from 'rambdax'
import { snakeCase, dotCase, pascalCase, titleCase } from 'string-fn'
import {
  copySync,
  emptyDirSync,
  moveSync,
  outputJsonSync,
  outputFileSync,
  readJsonSync,
  removeSync,
} from 'fs-extra'

function getBaboon(baboonInput, themeNameInput){
  const themeIndexBase = remove('baboon.', baboonInput)
  const themeIndex = Number(themeIndexBase)
  const themeBase = Number.isNaN(themeIndex) ?
    `baboon.${ themeIndexBase }` :
    `baboon.${ namesHash[ themeIndex ] }`

  const theme = pascalCase(themeBase)
  const themeName = pascalCase(themeNameInput)

  const toReturn = {
    theme,
    themeName,
  }

  return toReturn
}

/*
  Index of all themes including dark one
*/

const THEMES = [
  'advanced.bat',
  'advanced.cat',
  'advanced.dog',
  'advanced.engine',
  'advanced.hook',
  'advanced.mystery',
  'brave.habits',
  'brave.love',
  'brave.neighbour',
  'circus.ajax',
  'circus.brother',
  'circus.people',
  'circus.whisky',
  'niketa.bear',
  'niketa.moon',
  'niketa.owl',
]

function updateJson(filePath, change){
  const obj = readJsonSync(filePath)
  const updated = {
    ...obj,
    ...change,
  }

  outputJsonSync(filePath, updated, { spaces : 2 })
}

function editPackageJson(themeName, json, isDark){
  const themes = {
    label   : titleCase(themeName),
    uiTheme : isDark ? 'vs-dark' : 'vs',
    path    : `./theme/${ dotCase(themeName) }.json`,
  }
  const icon = `theme/${ dotCase(themeName) }.png`

  const partial = {
    icon,
    version     : '0.1.0',
    name        : themeName + 'Niketa',
    displayName : themeName,
    contributes : { themes : [ themes ] },
  }

  return {
    ...json,
    ...partial,
  }
}

function editReadme(themeName, readme){
  const first = replace(/Brave\sHomer/g, titleCase(themeName), readme)
  const second = replace(/BraveHomer/g, pascalCase(themeName), first)
  const third = replace(/brave\.homer/g, dotCase(themeName), second)
  const fourth = replace(/brave_homer/g, snakeCase(themeName), third)

  return fourth
}

export function exportToMono(themeIndex, outputName){
  const isDark = outputName && outputName.startsWith('because')
  const filePathBase = resolveMethod(
    __dirname,
    '../../../../niketa-themes/packages'
  )

  if (!existsSync(filePathBase))
    return console.log(`${ filePathBase } is not a directory`)

  if (typeof themeIndex === 'string' && !outputName)
    return console.log('need to pass name as well')

  // When we publish from dev theme, we pass fn('baboon.2'/'baboon.literal', 'more.pump')
  // When we publish Niketa theme, we pass only index fn(10)
  // ============================================
  const { theme, themeName } = outputName ?
    getBaboon(themeIndex, outputName) :
    {
      theme     : THEMES[ themeIndex ],
      themeName : THEMES[ themeIndex ],
    }

  const demoSource = `${ filePathBase }/brave_homer`
  const outputFolder = `${ filePathBase }/${ snakeCase(themeName) }`
  emptyDirSync(outputFolder)

  const jsonName = `${ pascalCase(theme) }.json`
  const jsonOutputName = `${ themeName }.json`
  const actualData = outputName ?
    readJsonAnt(`baboon/${ jsonName }`) :
    readJsonAnt(`themes/${ jsonName }`)

  const destination = `${ outputFolder }/theme/BraveHomer.json`
  const packageJsonFile = `${ outputFolder }/package.json`
  const themeDestination = `${ outputFolder }/theme/${ jsonOutputName }`

  const screenSource = resolve(`files/${ dotCase(theme) }.png`)
  log({ screenSource })
  const screenDestination = resolve(
    `${ outputFolder }/theme/${ dotCase(themeName) }.png`
  )

  /*
    Copy from BraveHomer
  */
  copySync(demoSource, outputFolder)

  /*
    Copy source
  */
  outputJsonSync(destination, actualData, { spaces : 2 })

  /*
    Rename theme.json
  */
  moveSync(destination, themeDestination)

  if (existsSync(screenSource)){
    copySync(screenSource, screenDestination)
    removeSync(`${ outputFolder }/theme/brave.homer.png`)
  } else {
    console.log('You need to save a screen before that')
    moveSync(
      `${ outputFolder }/theme/niketa.fallback.png`,
      `${ outputFolder }/theme/${ dotCase(themeName) }.png`
    )
    removeSync(`${ outputFolder }/theme/brave.homer.png`)
  }

  const packageJson = readJsonSync(packageJsonFile)
  const editedPackageJson = editPackageJson(
    pascalCase(themeName),
    packageJson,
    isDark
  )

  /*
    Save corrected package.json
  */
  outputJsonSync(packageJsonFile, editedPackageJson, { spaces : 2 })

  /*
    Save corrected readme
  */
  const readmeFile = isDark ?
    resolve(`${ outputFolder }/README_DARK.md`) :
    resolve(`${ outputFolder }/README.md`)

  const readme = readFileSync(readmeFile).toString()
  const editedReadme = editReadme(themeName, readme)

  outputFileSync(readmeFile, editedReadme)
  removeSync(`${ outputFolder }/README_DARK.md`)

  /*
    Handle standalone themes
  */

  updateJson(themeDestination, {
    name : themeName,
    type : isDark ? 'dark' : 'light',
  })
  console.log({ themeName })
}
