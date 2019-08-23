import { filterColors } from './filterColors.js'
import colorsOrigin from '../lambdas/best_triangle/colorsOrigin.json'

test('happy', () => {
  const result = filterColors({
    colors         : colorsOrigin,
    blueTolerance  : 1.35,
    redTolerance   : 1.25,
    blackTolerance : 1.55,
  })
  console.log(result.length)
  console.log(colorsOrigin.length)

  expect(result).toMatchSnapshot()
})
