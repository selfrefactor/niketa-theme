import { sort, replace } from 'rambdax'
import { readJsonAnt, resolve } from '../../src/ants/readJson'
import { resolve as resolveMethod } from 'path'
import { existsSync, readFileSync } from 'fs'
import { exec } from 'helpers'
import { snakeCase, dotCase, titleCase } from 'string-fn'
import {
  copySync,
  outputJsonSync,
  outputFileSync,
} from 'fs-extra'
import { readdirSync } from 'fs'
const sortFn = (a, b) => a > b ? -1 : 1

export function getLastestScreen(){
  const dir = `${ process.env.HOME }/Pictures`
  const pictures = readdirSync(dir)
  const allScreens = pictures.filter(x => x.startsWith('Screenshot'))
  const [ lastScreen ] = sort(sortFn, allScreens)
  if (!lastScreen) throw new Error('!lastScreen')

  return `${ dir }/${ lastScreen }`
}

export async function exportToMono(themeName, withScreenshot = false, republishAs = ''){
  getLastestScreen()
  const republishSnake = snakeCase(republishAs)
  const asDot = dotCase(themeName)
  const asSnake = snakeCase(themeName)
  const filePathBase = resolveMethod(
    __dirname,
    '../../../niketa-themes/packages'
  )

  if (!existsSync(filePathBase))
    return console.log(`${ filePathBase } is not a directory`)

  const actualData = readJsonAnt(`themes/${ themeName }.json`)
  const destination = `${ filePathBase }/${ asSnake }`
  const themeDestination = `${ destination }/theme/${ asDot }.json`
  const republishFolder = `${ filePathBase }/${ republishSnake }`
  const republishPackageJson = `${ republishFolder }/package.json`

  const niketaScreenLocation = resolve(`files/${ asDot }.png`)
  const screenSource = withScreenshot ?
    getLastestScreen() :
    niketaScreenLocation

  if (withScreenshot){
    // So when trending screen is updated
    //  so is the screen part of Niketa screens
    // ============================================
    copySync(screenSource, niketaScreenLocation)
  }

  const screenDestination = resolve(
    `${ destination }/theme/${ asDot }.png`
  )

  outputJsonSync(themeDestination, actualData, { spaces : 2 })
  if (existsSync(screenSource)){
    copySync(screenSource, screenDestination)
  } else {
    console.log('You need to save a screen before that')
  }
  await exec({
    command : 'run d feat@bump minor',
    cwd     : destination,
  })
  await exec({
    command : 'vsce publish minor',
    cwd     : destination,
  })
  await exec({
    command : 'run d small',
    cwd     : destination,
  })

  if (republishAs){
    republish({
      republishFolder,
      source : destination,
      republishPackageJson,
      themeName,
      republishAs,
    })
  }
}

function performRename(content, newName, oldName, skipDotCase = false){
  const afterDot = replace(new RegExp(dotCase(oldName), 'g'), dotCase(newName), content)

  const afterSnake = replace(new RegExp(snakeCase(oldName), 'g'), snakeCase(newName), skipDotCase ? content : afterDot)
  const afterTitle = replace(new RegExp(titleCase(oldName), 'g'), titleCase(newName), afterSnake)

  return replace(new RegExp(oldName, 'g'), newName, afterTitle)
}

async function republish({ republishFolder, republishPackageJson, source, themeName, republishAs }){
  if (existsSync(republishFolder)){
    return console.log('Please empty destination folder', republishAs)
  }
  copySync(source, republishFolder)

  const readme = readFileSync(`${ source }/README.md`).toString()
  const editedReadme = performRename(readme, republishAs, themeName, true)
  outputFileSync(`${ republishFolder }/README.md`, editedReadme)

  const packageJson = readFileSync(republishPackageJson).toString()
  const editedPackageJson = performRename(packageJson, republishAs, themeName, true)
  outputFileSync(republishPackageJson, editedPackageJson)

  await exec({
    command : `run d feat@publish ${ dotCase(republishAs) }`,
    cwd     : republishFolder,
  })
  await exec({
    command : 'vsce publish',
    cwd     : republishFolder,
  })
  await exec({
    command : 'run d small',
    cwd     : republishFolder,
  })
}
