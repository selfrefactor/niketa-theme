import { exportToMono } from './'

test('happy', () => {
  expect(() => exportToMono(10)).not.toThrow()
})
