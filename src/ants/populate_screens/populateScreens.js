import { readdirSync } from 'fs'
import { copySync } from 'fs-extra'
import { resolve } from 'path'
import { dotCase } from 'string-fn'
import { sort, pluck } from 'rambdax'
import themes from '../../../exported.json'

export function populateScreensAnt(){
  const sortFn = (a,b)=> a > b ? 1 : -1
  const base = resolve(
    __dirname,
    '../../../files'
  )
  const screens = readdirSync(`${base}/raw_screens`)
  const sortedScreens = sort(sortFn,screens)

  const themesNames = pluck('label', sort(sortFn, themes))
  const screenDestinations = themesNames.map(x => {
    return `${base}/${dotCase(x)}.png`
  })

    

    // sortedScreens.forEach((screenPath, i) => copySync(
    //   screenPath,
    //   screenDestinations[i]
    // ))

}
