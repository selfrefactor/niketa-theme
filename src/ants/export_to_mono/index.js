import { readJsonAnt, resolve } from '../readJson'
import { namesHash } from '../../bees/saveTheme'
import { resolve as resolveMethod } from 'path'
import { existsSync, readFileSync } from 'fs'
import {replace, remove } from 'rambdax'
import { snakeCase, pascalCase, titleCase } from 'string-fn'
import {
  copySync,
  emptyDirSync,
  moveSync,
  outputJsonSync,
  outputFileSync,
  readJsonSync,
  removeSync,
} from 'fs-extra'

function getBaboon(baboonInput){
  const themeIndex = Number(remove('baboon.', baboonInput))

  return pascalCase(`baboon.${namesHash[themeIndex]}`)
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
    version: "0.1.0",
    name: themeName + 'Niketa',
    displayName: themeName,
    "contributes": {
      "themes": [themes]
    },
  }
}

function editReadme(themeName, readme){
  return replace(/Brave\sHomer/, titleCase(themeName) , readme)
}

export function exportToMono(themeIndex, outputName){
  const filePathBase = resolveMethod(
    __dirname,
    '../../../../niketa-themes/packages'
  )

  if (!existsSync(filePathBase)) return console.log(`${ filePathBase } is not a directory`)

  if(typeof themeIndex === 'string' && !outputName) return console.log('need to pass name as well')

  // When we publish from dev theme, we pass ('baboon.2', 'more.pumpkins')
  // ============================================
  const theme = outputName ?
     getBaboon(themeIndex) :
     THEMES[ themeIndex ] 

  const demoSource = `${ filePathBase }/brave_homer`
  const outputFolder = `${ filePathBase }/${ snakeCase(theme) }`
  emptyDirSync(outputFolder)

  const jsonName = `${ pascalCase(theme) }.json`
  const actualData = outputName ?
    readJsonAnt(`baboon/${ jsonName }`) :
    readJsonAnt(`themes/${ jsonName }`)

  const destination = `${ outputFolder }/theme/BraveHomer.json`
  const packageJsonFile = `${outputFolder}/package.json`
  const themeDestination = `${outputFolder}/theme/${jsonName}`
  
  const screenSource = resolve(`files/${theme}.png`) 
  const screenDestination = resolve(`${outputFolder}/theme/${theme}.png`) 


  // handle dark
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

  if(existsSync(screenSource)){
    copySync(screenSource, screenDestination)
    removeSync(`${ outputFolder }/theme/brave.homer.png`)
  }

  const packageJson = readJsonSync(packageJsonFile)
  const editedPackageJson = editPackageJson(pascalCase(theme), packageJson)
  
  /*
    Save corrected package.json
  */
  outputJsonSync(packageJsonFile, editedPackageJson, {spaces:2})

  /*
    Save corrected readme
  */
  const readmeFile = resolve(`${outputFolder}/README.md`) 
  const readme = readFileSync(readmeFile).toString() 
  const editedReadme = editReadme(theme,readme)
  
  outputFileSync(readmeFile, editedReadme)

  console.log({
    editedReadme  ,
  })
}
