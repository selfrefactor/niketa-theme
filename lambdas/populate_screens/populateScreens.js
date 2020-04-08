import { readdirSync } from 'fs'
import { copySync } from 'fs-extra'
import { resolve } from 'path'
import { sort } from 'rambdax'
import { dotCase } from 'string-fn'

import { themesNames } from '../../src/constants'

export function populateScreens(){
  const sortFn = (a, b) => a > b ? 1 : -1
  const destinationBase = resolve(__dirname, '../../files')
  const screens = readdirSync(`${ __dirname }/raw_screens`)
  const sortedScreens = sort(sortFn, screens)
  const screensSources = sortedScreens.map(x => `${ __dirname }/raw_screens/${ x }`)

  const screenDestinations = themesNames.map(x => `${ destinationBase }/${ dotCase(x) }.png`)
  screensSources.forEach((screenPath, i) => {
    console.log(i, screenPath)

    copySync(screenPath, screenDestinations[ i ])
  })
}
