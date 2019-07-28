import { readJsonAnt } from '../../ants/readJson'
import { writeJsonAnt } from '../../ants/writeJson'
const getContrastRatio = require('get-contrast-ratio')
import { getCombinations } from './permutation'
import { glue, piped, sort, range, tap, take, pluck, prepend, map, mapAsync, flatten, any, filter, toDecimal, maybe, complement, splitEvery, nth, omit, shuffle, uniq } from 'rambdax'
import axios from 'axios'

const SAVED = 'src/ants/trending_colors/saved.json'
const SAVED_SK = 'src/ants/trending_colors/sk.json'
const SAVED_FILTERED = 'src/ants/trending_colors/filtered.json'

function getContrast(a, b){
  return getContrastRatio.default(a, b)
}
const BLUE_BASE = '#00f'
const RED_BASE = '#f00'
const DARK_BASE = '#000'
const LIGHT_BASE = '#fff'
const isRed = x => getContrast(x, RED_BASE) < 1.15
export const isTooLight = x => getContrast(x, LIGHT_BASE) < 2.2
const isDark = x => {
  const aa = getContrast(x, DARK_BASE) < 1.5

  return aa
}
const isBlue = x => maybe(
  isDark(x),
  true,
  isRed(x) ? false : getContrast(x, BLUE_BASE) < 2
)

function filterAgainstTwoBlues(colors){
  const blues = colors.filter(
    isBlue
  )

  return blues.length === 1 || blues.length === 0
}

async function getColorsFragment(offset){
  console.log({ offset })
  const url = glue(`
    http://www.colourlovers.com/api/colors?format=json
    numResults=100
    orderCol=dateCreated
    sortBy=DESC
    resultOffset=${ offset }
    `, '&')
  const { data } = await axios.get(url)

  return data
}

async function getColors(numFragments = 10){
  const colorsRaw = await mapAsync(
    async i => getColorsFragment(i * 100),
  )(range(0, numFragments))
  const colors = flatten(colorsRaw)

  const sk = piped(
    colors,
    sort((a, b) => {
      if (a.numVotes !== b.numVotes){
        return a.numVotes > b.numVotes ? -1 : 1
      }
      if (a.numViews === b.numViews) return 0

      return a.numViews > b.numViews ? -1 : 1
    }),
  )
  console.log(sk[ 0 ], sk.length, 'SAVED')
  writeJsonAnt(SAVED, sk)
}

const restoreColors = () => readJsonAnt(SAVED)

function getIndexes(limit){
  const indexList = []
  getCombinations(range(0, limit), 3, indexList)

  return indexList.map(x => x.split(' ').map(Number))
}

function evaluateCombination(indexListInstance, colors, background){
  const color1 = colors[ indexListInstance[ 0 ] ]
  const color2 = colors[ indexListInstance[ 1 ] ]
  const color3 = colors[ indexListInstance[ 2 ] ]
  const betweenContrast = [
    getContrast(color1, color2),
    getContrast(color1, color3),
    getContrast(color2, color3),
  ]
  const okBetween = any(x => x < 1.5, betweenContrast)
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

function getLocalColors(colorLovers, limit){
  const list = []

  map(x => map(xx => list.push(xx), x))(readJsonAnt('colors.json'))

  const localColors = piped(
    list,
    filter(x => x.length === 7)
  )
  if (!colorLovers) return localColors
  const halfLimit = Math.floor(limit / 2)
  const partialColorLovers = shuffle(take(limit, colorLovers))

  return [
    ...take(halfLimit, partialColorLovers),
    ...take(halfLimit, shuffle(localColors)),
  ]
}

const BACKGROUND = '#FAF8F3'
const LIMIT = 130
const INDEX = 0

export async function trendingColorsAnt({ reload, useLocalColors, mixFlag, predicate }){
  if (predicate){
    const filtered = predicate(readJsonAnt(SAVED_SK))
    console.log(filtered.length)

    return writeJsonAnt(SAVED_FILTERED, filtered)
  }

  const trendingColors = reload ? restoreColors() : await getColors(100)
  const getColorLovers = () => piped(
    trendingColors,
    pluck('hex'),
    map(prepend('#')),
    splitEvery(LIMIT),
    nth(INDEX),
  )
  const colors = maybe(
    mixFlag,
    getLocalColors(getColorLovers(), LIMIT),
    useLocalColors ?
      getLocalColors(LIMIT) :
      getColorLovers()
  )
  const numberIterations = useLocalColors || mixFlag ? take(LIMIT, colors.length).length : LIMIT
  const indexList = getIndexes(numberIterations)
  console.log(colors.length, indexList.length)

  const sk = piped(
    indexList,
    map(indexListInstance => evaluateCombination(indexListInstance, colors, BACKGROUND)),
    filter(Boolean),
    filter(x => filterAgainstTwoBlues(x.colors)),
    filter(x => x.minBetween > 1.7),
    filter(x => x.minBackground > 1.8),
    sort((a, b) => {
      if (a.minBetween === b.minBetween){
        return a.maxBetween > b.maxBetween ? -1 : 1
      }

      return a.minBetween > b.minBetween ? -1 : 1
    }),
    map(({ unsorted, colors, ...rest }) => ({
      ...rest,
      COLORS : {
        COLOR_0 : unsorted[ 0 ],
        COLOR_1 : unsorted[ 1 ],
        COLOR_2 : unsorted[ 2 ],
      },
    }))
  )

  console.log(sk.length)

  writeJsonAnt(SAVED_SK, sk)
}

