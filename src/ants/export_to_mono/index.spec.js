import { exportToMono } from './'

test('happy', () => {
  expect(() => exportToMono('baboon.literal', 'because.ask')).not.toThrow()
})
