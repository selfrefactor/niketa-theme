import { readJsonAnt, resolve } from '../../src/ants/readJson'
import { resolve as resolveMethod } from 'path'
import { existsSync } from 'fs'
import { exec } from 'helpers'
import { snakeCase, dotCase } from 'string-fn'
import {
  copySync,
  outputJsonSync,
} from 'fs-extra'

export async function exportToMono(themeName){
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

  const screenSource = resolve(`files/${ asDot }.png`)
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
