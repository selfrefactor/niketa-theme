import { load, save } from 'package-storage'
import { mapAsync } from 'rambdax'
import { ms } from 'string-fn'

import { themesNames } from '../../src/constants.js'
import { exportToMono } from './exportToMono'

jest.setTimeout(ms('5 minutes'))

const STANDALONES_VERSION_KEY = 'standaloneVersion'

async function bumpVersion(version){
  const [ major, minor, patch ] = version.split('.').map(Number)
  const newVersion = `${ major }.${ minor }.${ patch + 1 }`

  return save(
    STANDALONES_VERSION_KEY, newVersion, undefined, true
  )
}

async function getVersion(){
  return load(
    STANDALONES_VERSION_KEY, undefined, true
  )
}

test.skip('happy', async () => {
  const version = await getVersion()

  await mapAsync(async themeName => await exportToMono(themeName, version),
    themesNames)

  await bumpVersion(version)
})
