import { translate } from './translate'

test('return color key', () => {
  expect(
    translate('back.0')
  ).toBe('#fafafa')
})
