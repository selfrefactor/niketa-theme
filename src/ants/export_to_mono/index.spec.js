import { range } from 'rambdax'
import { exportToMono } from './'

// TODO fix homepage
test.skip('happy', () => {
  expect(() => exportToMono(1)).not.toThrow()
  // expect(() => exportToMono('baboon.1', 'because.never')).not.toThrow()
})

test('all', () => {
  range(0,17).map(i => {
    expect(() => exportToMono(i)).not.toThrow()
  })
})
