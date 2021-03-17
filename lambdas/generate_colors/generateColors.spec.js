import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#00ffcf', '#333' ],
    levels : 40,
  })
})
