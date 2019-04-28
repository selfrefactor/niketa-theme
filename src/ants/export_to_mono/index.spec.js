import { exportToMono } from './'

test('happy', () => {
  expect(() => exportToMono('baboon.11', 'because.always')).not.toThrow()
})
