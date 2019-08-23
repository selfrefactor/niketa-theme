import { take, piped, sort, map, toDecimal } from 'rambdax'
import {
  sortFn,
  calculateTriangleScore,
} from '../best_triangle/bestTriangle.js'
import colorsOrigin from '../best_triangle/colorsOrigin.json'
import { writeJsonAnt } from '../../src/ants/writeJson'
import { filterColors } from '../../lib/filterColors'

export function betterColor({
  batch,
  colorOne,
  colorTwo,
  background,
  colorTolerance,
}){
  const filteredColors = filterColors({
    colors         : colorsOrigin,
    blueTolerance  : colorTolerance,
    redTolerance   : colorTolerance,
    blackTolerance : toDecimal(colorTolerance + 0.33),
  })

  const rawResult = filteredColors.map(possibleColor => calculateTriangleScore(
    colorOne,
    colorTwo,
    possibleColor,
    background
  )).filter(Boolean)

  return piped(
    rawResult,
    // filter(x => x.minBetween > 1.3),
    sort(sortFn),
    take(batch),
    map(({ unsorted, colors, ...rest }) => ({
      ...rest,
      COLORS : {
        COLOR_0 : unsorted[ 2 ],
        COLOR_1 : unsorted[ 0 ],
        COLOR_2 : unsorted[ 1 ],
      },
    })),
    x => writeJsonAnt('lambdas/better_color/colors.json', x)
  )
}

