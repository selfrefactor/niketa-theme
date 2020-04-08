import { exportToMono } from './exportToMono'
import {ms} from 'string-fn'

jest.setTimeout(ms('5 minutes'))

test('happy', async () => {
  await exportToMono('StrangeBrew')
})
