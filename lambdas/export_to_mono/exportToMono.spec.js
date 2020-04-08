import { ms } from 'string-fn'
import { exportToMono } from './exportToMono'

jest.setTimeout(ms('5 minutes'))

test('happy', async () => {
  await exportToMono('StrangeBrew')
})
