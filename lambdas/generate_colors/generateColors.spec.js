import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({
    input  : [ '#adb3bc', '#fafafa' ],
    levels : 40,
  })
})
