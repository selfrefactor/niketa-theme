import { readJsonAnt } from '../../ants/readJson'
import { writeJsonAnt } from '../../ants/writeJson'
const getContrastRatio = require('get-contrast-ratio')
import { getCombinations } from './permutation'
import { glue, piped, sort, range, tap, take, pluck, prepend, map, mapAsync, flatten , any , filter , toDecimal } from 'rambdax'
import axios from 'axios'

const SAVED = 'src/ants/trending_colors/saved.json'
const SAVED_COLORS = 'src/ants/trending_colors/colors.json'
const SAVED_SK = 'src/ants/trending_colors/sk.json'

function getContrast(a,b){
  return getContrastRatio.default(a, b)
}

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
    // tap(x => x.map(xx => console.log(xx.numVotes, xx.numViews))),
    // take(20),
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
  const color1 = colors[indexListInstance[0]]
  const color2 = colors[indexListInstance[1]]
  const color3 = colors[indexListInstance[2]]
  const betweenContrast = [
    getContrast(color1, color2),
    getContrast(color1, color3),
    getContrast(color2, color3),
  ]
  const okBetween = any(x => x < 1.5,betweenContrast)
  if(okBetween) return false
  const compareToBackground = [
    getContrast(color1, background),
    getContrast(color2, background),
    getContrast(color3, background),
  ]
  if(any(x => x < 1.5,compareToBackground)) return false
  const sorted = [color1, color2, color3].sort()
  const minBetween = Math.min(...betweenContrast)
  const minBackground = Math.min(...compareToBackground)
  const maxBetween = Math.max(...betweenContrast)
  const maxBackground = Math.max(...compareToBackground)

  return {colors: sorted, minBetween, minBackground, maxBackground, maxBetween}
}

const BACKGROUND = '#eaeaf4'
const LIMIT = 20
export async function trendingColorsAnt(reload = true){
  const trendingColors = reload ? restoreColors() : await getColors()
  const colors = piped(
    trendingColors,
    take(LIMIT),
    pluck('hex'),
    map(prepend('#'))
  )
  let counter = -1
  let counterx = -1
  const indexList = getIndexes(LIMIT)
  // console.log({indexList})
  const sk = piped(
    indexList,
    map(indexListInstance => evaluateCombination(indexListInstance, colors,BACKGROUND)),
    filter(Boolean),
    sort((a, b) => {
      if (toDecimal(a.minBackground - b.minBackground) < 0.65){
        if(a.minBetween ===  b.minBetween){
          counter++
          return a.maxBetween > b.maxBetween ? -1 : 1
        }
        return a.minBackground <  b.minBackground ? -1 : 1
      }
    }),
  )
    
  writeJsonAnt(SAVED_SK, sk)
}

