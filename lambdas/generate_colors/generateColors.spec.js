import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#3dcbc9', '#444444' ],
    levels : 40,
  })
})
