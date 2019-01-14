import { applyDistanceAnt } from './applyDistance'
import { uniq, range } from 'rambdax'

test('applyDistance', () => {
  const result = uniq(
    range(0, 10).map(() => applyDistanceAnt('9', 7))
  )
  expect(result.includes('2')).toBeTruthy()
  expect(result.includes('F')).toBeTruthy()
})

test('shorted distance', () => {
  const result = uniq(
    range(0, 10).map(() => applyDistanceAnt('9', 4))
  )
  expect(result.includes('5')).toBeTruthy()
  expect(result.includes('D')).toBeTruthy()
})

test('char is too low', () => {
  expect(applyDistanceAnt('1', 9)).toBe('A')
})

test('char is too high', () => {
  expect(applyDistanceAnt('e', 4)).toBe('A')
})
