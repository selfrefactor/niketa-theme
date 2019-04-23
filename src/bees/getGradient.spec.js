import { getGradientBee } from './getGradient'

test('get gradient', () => {
  const expected = [ '#fafafa', '#cecece', '#a2a2a2', '#767676', '#4a4a4a' ]

  expect(
    getGradientBee('#fafafa', '#4a4a4a')
  ).toEqual(expected)
})

test('with opacity', () => {
  const expected = [ '#11fafaa3', [
    '#1fcece', '#2da2a2', '#3b7676',
  ], '#4a4a4a2a' ]

  const result = getGradientBee('#11fafaa3', '#4a4a4a2a')

  expect(
    result
  ).toEqual(expected)
})
