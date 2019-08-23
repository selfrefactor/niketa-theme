import { betterColor } from './betterColor.js'

const COLOR_0 = '#d8576a'
const COLOR_1 = '#399090'
const BACKGROUND = '#ede8e1'
const BATCH = 200
const COLOR_TOLERANCE = 1.4

test('happy', () => {

  betterColor({
    colorTolerance : COLOR_TOLERANCE,
    batch          : BATCH,
    colorOne       : COLOR_0,
    colorTwo       : COLOR_1,
    background     : BACKGROUND,
  })
})
