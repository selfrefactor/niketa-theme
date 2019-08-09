import { readdirSync } from 'fs'
import { copySync } from 'fs-extra'
import { resolve } from 'path'
import { dotCase, snakeCase } from 'string-fn'
import { sort, pluck } from 'rambdax'
import themes from '../../exported.json'

export function populateScreens(){
  const sortFn = (a, b) => a > b ? 1 : -1
  const base = resolve(__dirname, '../../files')
  const lernaBase = resolve(
    __dirname,
    '../../../niketa-themes/packages'
  )
  const screens = readdirSync(`${ base }/raw_screens`)
  const sortedScreens = sort(sortFn, screens)
  const screensSources = sortedScreens.map(x => `${ base }/raw_screens/${ x }`)

  const themesNames = sort(sortFn, pluck('label', themes))
  const screenDestinations = themesNames.map(
    x => `${ base }/${ dotCase(x) }.png`
  )
  const lernaDestinations = themesNames.map(
    x => `${ lernaBase }/${ snakeCase(x) }/theme/${ dotCase(x) }.png`
  )
  screensSources.forEach((screenPath, i) => {
    console.log(i, screenPath)

    copySync(screenPath, screenDestinations[ i ])
    copySync(screenPath, lernaDestinations[ i ])
  })
}
