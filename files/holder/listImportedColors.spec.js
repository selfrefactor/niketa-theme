import { listImportedColorsAnt } from './listImportedColors'

test('showImportedColors', () => {
  const result = listImportedColorsAnt()
  expect(Array.isArray(result)).toBeTruthy()
})
