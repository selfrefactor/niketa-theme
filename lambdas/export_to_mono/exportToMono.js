import { readFileSync } from 'fs'
import { copy, outputFile, outputJson, readJson } from 'fs-extra'
import { exec } from 'helpers-fn'
import { load, save } from 'package-storage'
import { resolve as resolveMethod } from 'path'
import { replace, sort, piped } from 'rambdax'
import { dotCase, snakeCase, titleCase } from 'string-fn'

import { readJsonAnt, resolve } from '../../src/ants/readJson'
const sortFn = (a, b) => a > b ? -1 : 1

const STANDALONES_VERSION_KEY = 'standaloneVersion'

async function bumpVersion(){

}

async function getVersion(){
  return load(STANDALONES_VERSION_KEY, undefined,true)
} 

const PROJECT_ROOT = resolveMethod(__dirname, '../../')

function createReadme({themeName, asDot, asSnake}){
  const templateData = readFileSync(`${__dirname}/template/README.md`).toString()

  return piped(
    templateData,
    replace(/FooBar/g, themeName),
    replace(/foo\.bar/g, asDot),
    replace(/foo_bar/g, asSnake),
  )
}

async function getPackageJson({themeName, asDot, asSnake}){
  const content = await readJson(`${__dirname}/template/package.json`)
  console.log(content)  
}

export async function exportToMono(themeName){
  const version = await getVersion()
  const asDot = dotCase(themeName)
  const asSnake = snakeCase(themeName)
  const readmeContent =  createReadme({themeName, asDot, asSnake})
  const packageJsonContent = await getPackageJson({version, themeName, asDot, asSnake})
  const filePathBase = resolveMethod(__dirname,
    '../../../niketa-themes/packages')
  
    const DESTINATION_ROOT = `${ filePathBase }/${ asSnake }`
    
    const themeSource = `${PROJECT_ROOT}/themes/${ themeName }.json`
    const themeDestination = `${ DESTINATION_ROOT }/theme/${ themeName }.json`
    
    const screenSource = `${PROJECT_ROOT}/files/${ asDot }.png`
    const screenDestination = `${DESTINATION_ROOT}/theme/${ asDot }.png`
    const readmeDestination = `${DESTINATION_ROOT}/README.md`

    await copy(screenSource, screenDestination, {overwrite: true})
    await copy(themeSource, themeDestination, {overwrite: true})
    await outputFile(readmeDestination, readmeContent)
 
    return console.log({themeDestination})  

  // await exec({
  //   command : 'run d feat@bump patch',
  //   cwd     : destination,
  // })
  // await exec({
  //   command : 'vsce publish patch',
  //   cwd     : destination,
  // })
  // await exec({
  //   command : 'run d chore@bump',
  //   cwd     : destination,
  // })
}

