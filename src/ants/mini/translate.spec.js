import { translate, translatex } from './translate'

test('return color key', () => {
  expect(
    translate('back.0')
  ).toBe('#fafafa')
})

test('return persisted opacity color', () => {
  expect(
    translatex('special.0')
  ).toBe('#c8403966-')
})
