import { exportToMono } from './'

test('happy', () => {
  expect(() => exportToMono(5)).not.toThrow()
  // expect(() => exportToMono('baboon.14', 'advanced.cat')).not.toThrow()
})
