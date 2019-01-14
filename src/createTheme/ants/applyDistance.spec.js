import { applyDistanceAnt } from './applyDistance'
import { uniq, range } from 'rambdax'

test('applyDistance', () => {
  const result = uniq(
    range(0,6).map(() => applyDistanceAnt('9',7))
  )
  expect(result.includes('2')).toBeTruthy()
  expect(result.includes('F')).toBeTruthy()
})

test('shorted distance', () => {
  const result = uniq(
    range(0,6).map(() => applyDistanceAnt('9',4))
  )
  expect(result.includes('5')).toBeTruthy()
  expect(result.includes('D')).toBeTruthy()
})

test('char is too low', () => {
  expect(applyDistanceAnt('1',4)).toBe(5)
})

test('char is too high', () => {
  expect(applyDistanceAnt('d',4)).toBe('F')
})
