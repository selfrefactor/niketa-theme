import { exportToMono } from './'

// TODO fix homepage
test('happy', () => {
  expect(() => exportToMono(16)).not.toThrow()
  // expect(() => exportToMono('baboon.1', 'because.never')).not.toThrow()
})
