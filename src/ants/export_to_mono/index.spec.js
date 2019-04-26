import { exportToMono } from './'

test('happy', () => {
  expect(() => exportToMono(1)).not.toThrow()
})
