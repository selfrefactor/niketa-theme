import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#009944', '#000' ],
    levels : 40,
  })
})
