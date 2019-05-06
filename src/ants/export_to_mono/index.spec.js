import { exportToMono } from './'

// TODO fix homepage
test('happy', () => {
  expect(() => exportToMono(16)).not.toThrow()
  // expect(() => exportToMono('baboon.deep', 'because.together')).not.toThrow()
})

