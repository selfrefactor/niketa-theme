import { betterColor } from './betterColor.js'

const COLOR_0 = '#900048'
const COLOR_1 = '#3a0088'
const BACKGROUND = '#c1bcae'
const BATCH = 300
const COLOR_TOLERANCE = 1
const BACKGROUND_TOLERANCE = 3.5

test('happy', () => {

  betterColor({
    backgroundTolerance : BACKGROUND_TOLERANCE,
    colorTolerance      : COLOR_TOLERANCE,
    batch               : BATCH,
    colorOne            : COLOR_0,
    colorTwo            : COLOR_1,
    background          : BACKGROUND,
  })
})

// Brave back - #f3f0e0
// Circus back - #ede8e1
// Niketa back - #d8d5c9
