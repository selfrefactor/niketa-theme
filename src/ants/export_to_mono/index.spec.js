import { exportToMono } from './'

test('happy', () => {
  expect(() => exportToMono(4)).not.toThrow()
})
