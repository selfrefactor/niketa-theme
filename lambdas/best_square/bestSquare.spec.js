import { map } from 'rambdax'
import { bestSquare } from './bestSquare.js'

const COLOR_TOLERANCE = 1.06
const COLOR_INDEX = 3
const BATCH = 200
const MIN_BETWEEN = 1
const MIN_BACKGROUND = 1.69
const BACKGROUND = '#d8d5c9'
const COLORS_RAW = {
  COLOR_0 : '#C66534',
  COLOR_1 : '#3c6e5b',
  COLOR_2 : '#532053',
  COLOR_3 : '#9e386a',
}

test('happy', () => {
  bestSquare({
    colorTolerance : COLOR_TOLERANCE,
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
// Niketa back - #d8d5c9
