import { translate } from '../ants/mini/translate'
import { getGradientBee } from './getGradient'

test.only('happy', () => {
  const result = getGradientBee(
    '#AEBABEE9', '#977D96E9', 27
  )

  // expect(
  //   getGradientBee('#fafafa', '#4a4a4a')
  // ).toEqual(expected)
})

test('get gradient', () => {
  const expected = [ '#fafafa', '#cecece', '#a2a2a2', '#767676', '#4a4a4a' ]

  expect(getGradientBee('#fafafa', '#4a4a4a')).toEqual(expected)
})

test('with opacity', () => {
  const expected = [
    '#977d9660',
    '#977d967B',
    '#977d9696',
    '#977d96B1',
    '#977d96CC',
    '#977d96E7',
  ]

  const result = getGradientBee('#977d96e9', '60')

  expect(result).toEqual(expected)
})

test('with opacity', () => {
  const result = getGradientBee(
    '#FAF8F3f1', '33', 22
  )
  expect(result.length).toBe(22)
})

test('with translatex', () => {
  expect(() =>
    getGradientBee(translate('special.5'), '#fafafa')).not.toThrow()
})
