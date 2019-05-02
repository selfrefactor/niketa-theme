import { exportToMono } from './'

test('happy', () => {
  expect(() => exportToMono(4)).not.toThrow()
  // expect(() => exportToMono('baboon.14', 'advanced.cat')).not.toThrow()
})
