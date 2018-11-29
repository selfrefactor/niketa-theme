import { toBase2Url } from './toBase2Url'

const input = 'cave-light'

const expected =
  'https://raw.githubusercontent.com/atelierbram/Base2Tone-VSCode-Themes/master/themes/Base2Tone_CaveLight-color-theme.json'

test('', () => {
  expect(toBase2Url(input)).toBe(expected)
})
