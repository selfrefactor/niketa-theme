import {
  map,
  none,
  piped,
  sort,
  take,
  uniq,
  tap,
} from 'rambdax'
import {
  sortFn,
  getContrast,
  filterWith,
} from '../best_triangle/bestTriangle.js'
import colorsOrigin from '../best_triangle/colorsOrigin.json'
import { writeJsonAnt } from '../../src/ants/writeJson'

const indexList = [
  [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ],
]

function evaluateSquare(colors, background, minBetween, minBackground){
  const betweenContrasts = indexList.map(([ a, b ]) =>
    getContrast(colors[ a ], colors[ b ])
  )
  const okBetween = none(x => x < minBetween, betweenContrasts)
  if (!okBetween) return
  const backgroundContrasts = colors.map(color => getContrast(color, background))
  const okBackground = none(x => x < minBackground, backgroundContrasts)
  if (!okBackground) return
  const minBetweenResult = Math.min(...betweenContrasts)
  const minBackgroundResult = Math.min(...backgroundContrasts)
  const maxBetween = Math.max(...betweenContrasts)
  const maxBackground = Math.max(...backgroundContrasts)

  return {
    colors,
    minBetween    : minBetweenResult,
    minBackground : minBackgroundResult,
    maxBackground,
    maxBetween,
  }
}

/*
  It allows four colored theme to replace one color
    with its better mathematical version
*/
export function bestSquare({
  background,
  batch,
  blackTolerance,
  colors,
  minBackground,
  minBetween,
}){
  const possibleColors = uniq(colorsOrigin)
  const filteredColors = possibleColors.filter(filterWith('#000', blackTolerance))
  const rawResult = filteredColors.map(possibleColor => evaluateSquare(
    [ ...colors, possibleColor ],
    background,
    minBetween,
    minBackground
  )).filter(Boolean)

  return piped(
    rawResult,
    sort(sortFn),
    take(batch),
    map(({ colors, ...rest }) => ({
      ...rest,
      COLORS : {
        COLOR_0 : colors[ 3 ],
        COLOR_1 : colors[ 0 ],
        COLOR_2 : colors[ 1 ],
        COLOR_3 : colors[ 2 ],
      },
    })),
    tap(x => console.log(x.length)),
    x => writeJsonAnt('lambdas/best_square/colors.json', x)
  )
}
