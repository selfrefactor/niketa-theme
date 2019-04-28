import { exportToMono } from './'

test('happy', () => {
  expect(() => exportToMono('baboon.14', 'advanced.cat')).not.toThrow()
})
