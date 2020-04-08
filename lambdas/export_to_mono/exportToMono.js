import { existsSync, readFileSync } from 'fs'
import { readdirSync } from 'fs'
import { copySync, outputFileSync, outputJsonSync } from 'fs-extra'
import { exec } from 'helpers-fn'
import { load, save } from 'package-storage'
import { resolve as resolveMethod } from 'path'
import { replace, sort } from 'rambdax'
import { dotCase, snakeCase, titleCase } from 'string-fn'

import { readJsonAnt, resolve } from '../../src/ants/readJson'
const sortFn = (a, b) => a > b ? -1 : 1

const STANDALONES_VERSION_KEY = 'standalones'

async function getVersion(){
  const a = await load(STANDALONES_VERSION_KEY, 'version')
  console.log(a)
}

export async function exportToMono(themeName){
  await getVersion()

  return
  const asDot = dotCase(themeName)
  const asSnake = snakeCase(themeName)
  const filePathBase = resolveMethod(__dirname,
    '../../../niketa-themes/packages')

  const actualData = readJsonAnt(`themes/${ themeName }.json`)
  const destination = `${ filePathBase }/${ themeName }`
  const themeDestination = `${ destination }/theme/${ themeName }.json`

  const niketaScreenLocation = resolve(`files/${ asDot }.png`)
  // copySync(screenSource, niketaScreenLocation)

  const screenDestination = resolve(`${ destination }/theme/${ asDot }.png`)

  outputJsonSync(
    themeDestination, actualData, { spaces : 2 }
  )
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
}

function performRename(
  content, newName, oldName, skipDotCase = false
){
  const afterDot = replace(
    new RegExp(dotCase(oldName), 'g'),
    dotCase(newName),
    content
  )

  const afterSnake = replace(
    new RegExp(snakeCase(oldName), 'g'),
    snakeCase(newName),
    skipDotCase ? content : afterDot
  )
  const afterTitle = replace(
    new RegExp(titleCase(oldName), 'g'),
    titleCase(newName),
    afterSnake
  )

  return replace(
    new RegExp(oldName, 'g'), newName, afterTitle
  )
}
