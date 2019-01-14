import { applyDistanceAnt } from './applyDistance'
import { uniq, range } from 'rambdax'

test('applyDistance', () => {
  const result = uniq(
    range(0,6).map(() => applyDistanceAnt(9,7))
  )
  expect(result.includes('2')).toBeTruthy()
  expect(result.includes('F')).toBeTruthy()
})
