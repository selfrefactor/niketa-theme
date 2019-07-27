import { readJsonAnt } from '../../ants/readJson'
import { writeJsonAnt } from '../../ants/writeJson'
import {getCombinations} from './permutation'
import { glue, piped, sort, range, tap, take, pluck, prepend , map } from 'rambdax'
import axios from 'axios'

const SAVED = 'src/ants/trending_colors/saved.json'
const SAVED_COLORS = 'src/ants/trending_colors/colors.json'

async function getColors(){
  const url = glue(`
    http://www.colourlovers.com/api/colors?format=json
    numResults=100
    orderCol=dateCreated
    sortBy=DESC
    `, '&')
  const { data } = await axios.get(url)
  const sk = piped(
    data,
    sort((a, b) => {
      if (a.numVotes !== b.numVotes){
        return a.numVotes > b.numVotes ? -1 : 1
      }
      if (a.numViews === b.numViews) return 0

      return a.numViews > b.numViews ? -1 : 1
    }),
    // tap(x => x.map(xx => console.log(xx.numVotes, xx.numViews))),
    take(20),
  )
  console.log(sk[ 0 ], 'SAVED')
  writeJsonAnt(SAVED, sk)
}

const restoreColors = () => readJsonAnt(SAVED)

function getIndexes(){
  const indexList = []
  getCombinations(range(0,10), 3, indexList)
  return indexList.map(x => x.split(' ').map(Number))
}

function evaluateCombination(indexListInstance, colors){
  
}

export async function trendingColorsAnt(reload = true){
  const trendingColors = reload ? restoreColors() : await getColors()
  const colors = piped(
    trendingColors,
    pluck('hex'),
    map(prepend('#'))
  )
  const indexList = getIndexes()  
  console.log({indexList})
  const aaa = evaluateCombination(indexList[0], colors)  

}

// writeJsonAnt(SAVED_COLORS, plucked.map(prepend('#')))