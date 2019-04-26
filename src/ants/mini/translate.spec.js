import { translate, translatex } from './translate'

test('happy', () => {
  expect(
    translate('back.18')
  ).toBe('#c3c1a9')
})

test('with opacity', () => {
  expect(
    translate('special.0').length
  ).toBe(9)

  expect(
    translatex('special.0').length
  ).toBe(7)
})
