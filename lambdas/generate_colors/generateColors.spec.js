import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#D58FDB', '#0031df' ],
    levels : 40,
  })
})
