import { readJsonAnt } from '../../ants/readJson'
import { writeJsonAnt } from '../../ants/writeJson'
const getContrastRatio = require('get-contrast-ratio')
import { getCombinations } from './permutation'
import { glue, piped, sort, range, tap, take, pluck, prepend, map, mapAsync, flatten, any, filter, toDecimal, maybe , complement , splitEvery , nth } from 'rambdax'
import axios from 'axios'

const SAVED = 'src/ants/trending_colors/saved.json'
const SAVED_COLORS = 'src/ants/trending_colors/colors.json'
const SAVED_SK = 'src/ants/trending_colors/sk.json'

function getContrast(a, b){
  return getContrastRatio.default(a, b)
}
const BLUE_BASE = '#00f'
const RED_BASE = '#f00'
const DARK_BASE = '#000'
const LIGHT_BASE = '#fff'
const isRed = x => getContrast(x, RED_BASE) < 1.15
const isDark = x => {
  const aa = getContrast(x, DARK_BASE) < 1.5
  // console.log(getContrast(x, BLUE_BASE),getContrast(x, RED_BASE),  getContrast(x, DARK_BASE), x,9,aa);

  return aa
}
const isTooLight = x => getContrast(x, LIGHT_BASE) < 6
// const allowColor = x => !isDark(x) && !isLight(x) 
const isBlue = x => maybe(
  isDark(x),
  true,
  isRed(x) ? false : getContrast(x, BLUE_BASE) < 2
)

function filterAgainstTwoBlues(colors){
  const blues = colors.filter(
    isBlue
  )
  // if(blues.length !== 2){

  //   console.log(blues, colors);
  // }

  return blues.length === 1 || blues.length === 0
}

const FOO = {
  COLORS : {
    COLOR_0 : '#2C226F',
    COLOR_1 : '#646EA7',
    COLOR_2 : '#8DC0D4',
  },
}
// console.log(filterAgainstTwoBlues([FOO.COLORS.COLOR_0, FOO.COLORS.COLOR_1,FOO.COLORS.COLOR_2]))
async function getColorsFragment(offset){
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

async function getColors(){
  const colorsRaw = await mapAsync(
    async i => getColorsFragment(i * 100),
  )(range(0, 10))
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

const BACKGROUND = '#FAF8F3'
const LIMIT = 130
const INDEX = 0
export async function trendingColorsAnt(reload = true){
  const trendingColors = reload ? restoreColors() : await getColors()
  const colors = piped(
    trendingColors,
    pluck('hex'),
    map(prepend('#')),
    splitEvery(LIMIT),
    nth(INDEX),
  )
  
  const indexList = getIndexes(LIMIT)
  const sk = piped(
    indexList,
    map(indexListInstance => evaluateCombination(indexListInstance, colors, BACKGROUND)),
    filter(Boolean),
    filter(x => filterAgainstTwoBlues(x.colors)),
    filter(x => x.minBetween > 2),
    filter(x => x.minBackground > 2.04),
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

