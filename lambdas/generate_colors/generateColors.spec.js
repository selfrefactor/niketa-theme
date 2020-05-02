import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#0d8a81', '#0031df' ],
    levels : 40,
  })
})
