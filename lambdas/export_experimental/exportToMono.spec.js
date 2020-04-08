import { exportToMono } from './exportToMono'

test('happy', async () => {
  jest.setTimeout(2 * 60 * 1000)
  await exportToMono()
})
