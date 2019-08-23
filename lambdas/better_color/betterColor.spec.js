import { betterColor } from './betterColor.js'

const COLOR_0 = '#780662'
const COLOR_1 = '#83580b'
const BACKGROUND = '#f4f1e3'
const BATCH = 200

test('happy', () => {

  betterColor({
    batch      : BATCH,
    colorOne   : COLOR_0,
    colorTwo   : COLOR_1,
    background : BACKGROUND,
  })
})
