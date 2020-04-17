import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#c3c7cb', '#1c2c5b' ],
    levels : 40,
  })
})
