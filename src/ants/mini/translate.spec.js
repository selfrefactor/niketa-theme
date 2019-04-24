import { translate, translateOpacity } from './translate'

test('happy', () => {
  expect(
    translate('back.0')
  ).toBe('#fafafa')
})

test('with opacity', () => {
  expect(
    translate('special.0').length
  ).toBe(9)

  expect(
    translateOpacity('special.0').length
  ).toBe(7)
})
