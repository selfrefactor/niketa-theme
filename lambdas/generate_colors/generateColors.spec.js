import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#cdd0d2', '#1c2c5b' ],
    levels : 40,
  })
})
