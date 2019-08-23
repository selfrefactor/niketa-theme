import { map } from 'rambdax'
import { bestSquare } from './bestSquare.js'

const BLACK_TOLERANCE = 1.9
const COLOR_INDEX = 1
const BATCH = 200
const MIN_BETWEEN = 1
const MIN_BACKGROUND = 1.09
const BACKGROUND = '#ede8e1'
const COLORS_RAW = {
  COLOR_1 : '#5c4c78',
  COLOR_0 : '#399090',
  COLOR_2 : '#113f67',
  COLOR_3 : '#d8576a',
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
// Circus back - #ede8e1
