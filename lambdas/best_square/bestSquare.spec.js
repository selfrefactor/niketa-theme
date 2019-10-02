import { map } from 'rambdax'
import { bestSquare } from './bestSquare.js'

const COLOR_TOLERANCE = 1.46
const COLOR_INDEX = 2
const BATCH = 500
const MIN_BETWEEN = 1.16
const MIN_BACKGROUND = 1.8
const BACKGROUND = '#ede8e1'
const COLORS_RAW = {
  COLOR_0 : '#399090',
  COLOR_1 : '#303e27',
  COLOR_2 : '#0b032d',
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
