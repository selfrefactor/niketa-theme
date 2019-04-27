import { readJsonAnt } from '../readJson'
import { resolve } from 'path'
import { existsSync } from 'fs'
import { copySync, outputJsonSync } from 'fs-extra'
import { snakeCase, pascalCase } from 'string-fn'

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

export function exportToMono(themeIndex){
  const filePathBase = resolve(
    __dirname,
    '../../../../niketa-themes/packages'
  )

  if (!existsSync(filePathBase)) return console.log(`${ filePathBase } is not a directory`)

  const demoSource = `${ filePathBase }/brave_homer`
  const outputFolder = `${ filePathBase }/${ snakeCase(THEMES[ themeIndex ]) }`

  const jsonName = `${pascalCase(THEMES[ themeIndex ])}.json`
  const actualData = readJsonAnt(`themes/${jsonName}`)
  const destination = `${outputFolder}/theme/${jsonName}`
  
  console.log({
    demoSource,
    outputFolder,
  })
  
  copySync(demoSource, outputFolder)
  outputJsonSync(destination, actualData, {spaces: 2})

  // console.log({ themeIndex })
}
