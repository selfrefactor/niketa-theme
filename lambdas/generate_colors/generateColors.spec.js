import { generateColors } from './generateColors'

test('happy', () => {
  generateColors({input: ['#fafafa', '#ec7a55'], levels: 40})
})