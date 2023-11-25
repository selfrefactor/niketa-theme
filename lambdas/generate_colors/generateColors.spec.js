import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#2d3e4c', '#000' ],
    levels : 40,
  })
})
