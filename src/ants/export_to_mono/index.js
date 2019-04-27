import { readJsonAnt, resolve } from '../readJson'
import { resolve as resolveMethod } from 'path'
import { existsSync } from 'fs'
import { dropLast } from 'rambdax'
import {
  copySync,
  emptyDirSync,
  moveSync,
  outputJsonSync,
  readJsonSync,
  removeSync,
} from 'fs-extra'
import { snakeCase, pascalCase, titleCase } from 'string-fn'

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
  'brave.homer',
  'brave.love',
  'brave.neighbour',
  'circus.ajax',
  'circus.brother',
  'circus.people',
  'circus.whisky',
  'niketa.bear',
  'niketa.moon',
  'niketa.owl',
  'because.forever',
  'because.always',
  'because.never',
  'because.you',
  'because.together',
]

function editPackageJson(themeName, json){
  const themes = {
    "label": titleCase(themeName),
    "uiTheme": "vs",
    "path":`./theme/${themeName}.json`
  }
  return {
    ...json,
    name: themeName + 'Niketa',
    displayName: themeName,
    "contributes": {
      "themes": [themes]
    },
  }
}

export function exportToMono(themeIndex){
  const filePathBase = resolveMethod(
    __dirname,
    '../../../../niketa-themes/packages'
  )

  if (!existsSync(filePathBase)) return console.log(`${ filePathBase } is not a directory`)

  const theme = THEMES[ themeIndex ]

  const demoSource = `${ filePathBase }/brave_homer`
  const outputFolder = `${ filePathBase }/${ snakeCase(theme) }`
  emptyDirSync(outputFolder)

  const jsonName = `${ pascalCase(theme) }.json`
  const actualData = readJsonAnt(`themes/${ jsonName }`)
  const destination = `${ outputFolder }/theme/BraveHomer.json`
  const packageJsonFile = `${outputFolder}/package.json`
  const themeDestination = `${outputFolder}/theme/${jsonName}`
  const screenSource = resolve(`files/${theme}.png`) 
  const screenDestination = resolve(`${outputFolder}/theme/${theme}.png`) 

    // handle dark
    // handle publish directly from baboon


  copySync(demoSource, outputFolder)

  outputJsonSync(destination, actualData, { spaces : 2 })

  moveSync(destination, themeDestination)

  if(existsSync(screenSource)){
    copySync(screenSource, screenDestination)
    removeSync(`${ outputFolder }/theme/brave.homer.png`)
  }

  const packageJson = readJsonSync(packageJsonFile)
  const editedPackageJson = editPackageJson(pascalCase(theme), packageJson)
  
  outputJsonSync(packageJsonFile, editedPackageJson, {spaces:2})

  console.log({
    editedPackageJson,
    screenSource,
    demoSource,
    outputFolder,
  })
  
}
