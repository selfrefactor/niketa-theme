import { exportToMono } from './'

// TODO fix homepage
test('happy', () => {
  // expect(() => exportToMono(15)).not.toThrow()
  expect(() => exportToMono('baboon.deep', 'because.together')).not.toThrow()
})

