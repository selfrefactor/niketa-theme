import {
  filter,
  head,
  map,
  piped,
  pluck,
  sort,
  take,
  tap,
} from 'rambdax'
import { calculateTriangleScore } from '../best_triangle/bestTriangle.js'
import colorsOrigin from '../best_triangle/colorsOrigin.json'
import { writeJsonAnt } from '../../src/ants/writeJson'
import { filterColors } from '../../lib/filterColors'
import { sortColors } from '../../lib/sortColors'

export function betterColor({
  batch,
  colorOne,
  colorTwo,
  background,
  colorTolerance,
  backgroundTolerance,
}){
  const filteredColors = filterColors({
    colors         : colorsOrigin,
    blueTolerance  : colorTolerance,
    redTolerance   : colorTolerance,
    blackTolerance : colorTolerance,
  })

  const rawResult = filteredColors.map(possibleColor => calculateTriangleScore(
    colorOne,
    colorTwo,
    possibleColor,
    background
  )).filter(Boolean)

  return piped(
    rawResult,
    sort(sortColors),
    filter(({ minBackground }) => minBackground > backgroundTolerance),
    tap(x => console.log(head(x))),
    take(batch),
    map(({ unsorted, colors, ...rest }) => ({ foo : unsorted[ 2 ] })),
    pluck('foo'),
    x => writeJsonAnt('lambdas/better_color/colors.json', x)
  )
}

