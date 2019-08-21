import { readJsonAnt } from '../../src/ants/readJson'
import { writeJsonAnt } from '../../src/ants/writeJson'
const getContrastRatio = require('get-contrast-ratio')
import { getCombinations } from './permutation'
import {
  any,
  none,
  filter,
  map,
  maybe,
  piped,
  range,
  shuffle,
  sort,
  take,
} from 'rambdax'
export const SAVED_SK = 'lambdas/best_triangle/sk.json'
const SAVED_FILTERED = 'lambdas/ants/best_triangle/filtered.json'

export function getContrast(a, b){
  return getContrastRatio.default(a, b)
}

export function filterWith(base, limit){
  return color => getContrast(color, base) > limit
}
export function filterAgainst(base, limit){
  return color => getContrast(color, base) < limit
}

function getIndexes(limit){
  const indexList = []
  getCombinations(range(0, limit), 3, indexList)

  return indexList.map(x => x.split(' ').map(Number))
}

export function calculateTriangleScore(color1, color2, color3, background){
  const betweenContrast = [
    getContrast(color1, color2),
    getContrast(color1, color3),
    getContrast(color2, color3),
  ]
  const okBetween = none(x => x < 1.5, betweenContrast)
  if (okBetween) return false
  const compareToBackground = [
    getContrast(color1, background),
    getContrast(color2, background),
    getContrast(color3, background),
  ]
  if (any(x => x < 1.5, compareToBackground)) return false
  const sorted = [ color1, color2, color3 ].sort()
  const minBetween = Math.min(...betweenContrast)
  const minBackground = Math.min(...compareToBackground)
  const maxBetween = Math.max(...betweenContrast)
  const maxBackground = Math.max(...compareToBackground)

  return {
    colors   : sorted,
    unsorted : [ color1, color2, color3 ],
    minBetween,
    minBackground,
    maxBackground,
    maxBetween,
  }
}

function evaluateCombination(indexListInstance, colors, background){
  const color1 = colors[ indexListInstance[ 0 ] ]
  const color2 = colors[ indexListInstance[ 1 ] ]
  const color3 = colors[ indexListInstance[ 2 ] ]

  return calculateTriangleScore(color1, color2, color3, background)
}

function getLocalColors(colors){
  const list = []
  map(x => map(xx => list.push(xx), x))(readJsonAnt('colors.json'))

  const localColors = piped(
    list,
    filter(x => x.length === 7)
  )
  const halfLimit = Math.floor(colors.length / 2)

  return shuffle([
    ...take(halfLimit, shuffle(colors)),
    ...take(halfLimit, shuffle(localColors)),
  ])
}

export function sortFn(a, b){
  if (a.minBackground === b.minBackground){
    return a.maxBetween > b.maxBetween ? -1 : 1
  }

  return a.minBackground > b.minBackground ? -1 : 1
}
export function sortFnx(a, b){
  if (a.minBetween === b.minBetween){
    return a.maxBetween > b.maxBetween ? -1 : 1
  }

  return a.minBetween > b.minBetween ? -1 : 1
}

export function filterColors(predicate){
  const filtered = predicate(readJsonAnt(SAVED_SK))
  console.log('filtered', filtered.length)

  return writeJsonAnt(SAVED_FILTERED, filtered)
}

export async function findBestTriangle({ colors, minBetween = 1.8, background }){
  const indexList = getIndexes(colors.length)

  return piped(
    indexList,
    map(indexListInstance => evaluateCombination(indexListInstance, colors, background)),
    filter(Boolean),
    // filter(x => filterAgainstTwoBlues(x.colors)),
    filter(x => x.minBetween > minBetween),
    sort(sortFn),
    map(({ unsorted, colors, ...rest }) => ({
      ...rest,
      COLORS : {
        COLOR_0 : unsorted[ 0 ],
        COLOR_1 : unsorted[ 1 ],
        COLOR_2 : unsorted[ 2 ],
      },
    }))
  )
}

export async function withLocalColors({ colors, minBetween, background }){
  const combinedColors = getLocalColors(colors)

  return findBestTriangle({
    colors : combinedColors,
    minBetween,
    background,
  })
}
