import { generateColorsAnt } from './'

test('happy', () => {
  const input = ['#fafafa', 'ochra.3']
  expect(() => generateColorsAnt(input)).not.toThrow()
})
