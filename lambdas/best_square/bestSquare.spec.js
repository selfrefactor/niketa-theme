import { map } from 'rambdax'
import { bestSquare } from './bestSquare.js'

const COLOR_INDEX = 1
const BATCH = 200
const MIN_BETWEEN = 1.18
const MIN_BACKGROUND = 2.18
const BACKGROUND = '#f9f6f2'
const COLORS_RAW = {
  COLOR_0 : '#480032',
  COLOR_1 : '#20639b',
  COLOR_2 : '#CF6F4B',
  COLOR_3 : '#8F1C3D',
}

test('happy', () => {
  bestSquare({
    batch         : BATCH,
    colors        : generateColors(COLORS_RAW, COLOR_INDEX),
    background    : BACKGROUND,
    minBetween    : MIN_BETWEEN,
    minBackground : MIN_BACKGROUND,
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
