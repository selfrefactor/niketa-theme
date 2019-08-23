import { map } from 'rambdax'
import { bestSquare } from './bestSquare.js'

const BLACK_TOLERANCE = 1.9
const COLOR_INDEX = 3
const BATCH = 200
const MIN_BETWEEN = 1.22
const MIN_BACKGROUND = 2.18
const BACKGROUND = '#f3f0e0'
const COLORS_RAW = {
  COLOR_0 : '#D27837',
  COLOR_1 : '#3b6160',
  COLOR_2 : '#6a3951',
  COLOR_3 : '#60b6b1',
}

test('happy', () => {
  bestSquare({
    blackTolerance : BLACK_TOLERANCE,
    batch          : BATCH,
    colors         : generateColors(COLORS_RAW, COLOR_INDEX),
    background     : BACKGROUND,
    minBetween     : MIN_BETWEEN,
    minBackground  : MIN_BACKGROUND,
  })
})

function generateColors(colors, indexToSkip){
  const toReturn = []

  map((x, key) => {
    if (!key.endsWith(indexToSkip)){
      toReturn.push(x)
    }
  })(colors)

  return toReturn
}

// Brave back - #f3f0e0
