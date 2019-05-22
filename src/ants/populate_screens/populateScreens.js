import { readdirSync } from 'fs'
import { copySync } from 'fs-extra'
import { resolve } from 'path'
import { dotCase } from 'string-fn'
import { sort, pluck } from 'rambdax'
import themes from '../../../exported.json'

export function populateScreensAnt(){
  const sortFn = (a, b) => a > b ? 1 : -1
  const base = resolve(
    __dirname,
    '../../../files'
  )
  const screens = readdirSync(`${ base }/raw_screens`)
  const sortedScreens = sort(sortFn, screens)
  const screensSources = sortedScreens.map(
    x => `${ base }/raw_screens/${ x }`
  )

  const themesNames = sort(sortFn, pluck('label', themes))
  const screenDestinations = themesNames.map(x => `${ base }/${ dotCase(x) }.png`)

  screensSources.forEach((screenPath, i) => copySync(
    screenPath,
    screenDestinations[ i ]
  ))
}
