import { translate, translatex } from './translate'

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
    translatex('special.0').length
  ).toBe(7)
})
