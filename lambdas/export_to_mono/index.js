import { readJsonAnt, resolve } from '../../src/ants/readJson'
import { resolve as resolveMethod } from 'path'
import { existsSync, readFileSync } from 'fs'
import { replace, log } from 'rambdax'
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

export function exportToMono(themeName){
  console.log(themeName)
  const filePathBase = resolveMethod(
    __dirname,
    '../../../../niketa-themes/packages'
  )

  return console.log({ filePathBase })

  if (!existsSync(filePathBase))
    return console.log(`${ filePathBase } is not a directory`)

  const demoSource = `${ filePathBase }/brave_homer`
  const outputFolder = `${ filePathBase }/${ snakeCase(themeName) }`
  emptyDirSync(outputFolder)

  const jsonName = `${ themeName }.json`
  const actualData = readJsonAnt(`themes/${ jsonName }`)
  const destination = `${ outputFolder }/theme/BraveHomer.json`
  const packageJsonFile = `${ outputFolder }/package.json`
  const themeDestination = `${ outputFolder }/theme/${ themeName }`

  const screenSource = resolve(`files/${ dotCase(themeName) }.png`)
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
  }

  const packageJson = readJsonSync(packageJsonFile)
  const editedPackageJson = editPackageJson(
    pascalCase(themeName),
    packageJson,
  )

  /*
    Save corrected package.json
  */
  outputJsonSync(packageJsonFile, editedPackageJson, { spaces : 2 })

  /*
    Save corrected readme
  */
  const readmeFile = resolve(`${ outputFolder }/README.md`)
  const readme = readFileSync(readmeFile).toString()
  const editedReadme = editReadme(themeName, readme)

  outputFileSync(readmeFile, editedReadme)
  removeSync(`${ outputFolder }/README_DARK.md`)

  /*
    Handle standalone themes
  */

  updateJson(themeDestination, {
    name : themeName,
    type : 'light',
  })
  console.log({ themeName })
}
