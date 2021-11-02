import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#e6000f', '#333' ],
    levels : 40,
  })
})
