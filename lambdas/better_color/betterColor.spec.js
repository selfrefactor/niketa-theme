import { betterColor } from './betterColor.js'
/*
    back    : '#f4f1e3',
  COLOR_0 : '#83580b',
  COLOR_1 : '#780662',
  COLOR_2 : '#090089',
*/
const COLOR_0 = '#780662'
const COLOR_1 = '#83580b'
const BACKGROUND = '#f4f1e3'
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
