import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#b66ae4', '#191970' ],
    levels : 40,
  })
})
