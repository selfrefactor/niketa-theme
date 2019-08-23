import { betterColor } from './betterColor.js'

const COLOR_0 = '#0d8a81'
const COLOR_1 = '#A0595E'
const BACKGROUND = '#ede8e1'
const BATCH = 200
const COLOR_TOLERANCE = 1.28

test('happy', () => {

  betterColor({
    colorTolerance : COLOR_TOLERANCE,
    batch          : BATCH,
    colorOne       : COLOR_0,
    colorTwo       : COLOR_1,
    background     : BACKGROUND,
  })
})
