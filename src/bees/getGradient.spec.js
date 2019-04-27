import { translate } from '../ants/mini/translate'
import { getGradientBee } from './getGradient'

test('get gradient', () => {
  const expected = [ '#fafafa', '#cecece', '#a2a2a2', '#767676', '#4a4a4a' ]

  expect(
    getGradientBee('#fafafa', '#4a4a4a')
  ).toEqual(expected)
})

test.skip('with opacity', () => {
  const expected = [ '#977d9660',
         '#977d967B',
         '#977d9696',
         '#977d96B1',
         '#977d96CC',
         '#977d96E7' ]

  const result = getGradientBee('#977d96e9', '60')

  expect(
    result
  ).toEqual(expected)
})

test('with translatex', () => {
  expect(() => getGradientBee(
    translate('special.5'),
    '#fafafa'
  )).not.toThrow()
})
