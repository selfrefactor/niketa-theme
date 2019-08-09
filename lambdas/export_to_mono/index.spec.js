import { exportToMono } from './'

// TODO fix homepage
test('happy', () => {
  expect(() => exportToMono('AdvancedHook')).not.toThrow()
  // expect(() => exportToMono('BraveLove')).not.toThrow()
})
