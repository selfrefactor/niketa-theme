import { mapAsync } from 'rambdax'
import { ms } from 'string-fn'

import { themesNames } from '../../src/constants.js'
import { exportToMono } from './exportToMono'

jest.setTimeout(ms('5 minutes'))

async function iterable(themeName){
  await exportToMono(themeName)
}

test('happy', async () => {
  // await mapAsync(iterable, themesNames)
})
