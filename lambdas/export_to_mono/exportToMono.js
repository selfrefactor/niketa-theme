import { sort, replace } from 'rambdax'
import { readJsonAnt, resolve } from '../../src/ants/readJson'
import { resolve as resolveMethod } from 'path'
import { existsSync, readFileSync } from 'fs'
import { exec } from 'helpers-fn'
import { snakeCase, dotCase, titleCase } from 'string-fn'
import {
  copySync,
  outputJsonSync,
  outputFileSync,
} from 'fs-extra'
import { readdirSync } from 'fs'
const sortFn = (a, b) => a > b ? -1 : 1

export async function exportToMono(themeName){
  return
  const asDot = dotCase(themeName)
  const asSnake = snakeCase(themeName)
  const filePathBase = resolveMethod(
    __dirname,
    '../../../niketa-themes/packages'
  )

  const actualData = readJsonAnt(`themes/${ themeName }.json`)
  const destination = `${ filePathBase }/${ themeName }`
  const themeDestination = `${ destination }/theme/${ themeName }.json`

  const niketaScreenLocation = resolve(`files/${ asDot }.png`)
  // copySync(screenSource, niketaScreenLocation)

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
}

function performRename(content, newName, oldName, skipDotCase = false){
  const afterDot = replace(new RegExp(dotCase(oldName), 'g'), dotCase(newName), content)

  const afterSnake = replace(new RegExp(snakeCase(oldName), 'g'), snakeCase(newName), skipDotCase ? content : afterDot)
  const afterTitle = replace(new RegExp(titleCase(oldName), 'g'), titleCase(newName), afterSnake)

  return replace(new RegExp(oldName, 'g'), newName, afterTitle)
}
