import { betterColor } from './betterColor.js'

const COLOR_0 = '#CF6F4B'
const COLOR_1 = '#8F1C3D'
const BACKGROUND = '#f9f6f2'
const BATCH = 100

test('happy', () => {

  betterColor({
    batch      : BATCH,
    colorOne   : COLOR_0,
    colorTwo   : COLOR_1,
    background : BACKGROUND,
  })
})
