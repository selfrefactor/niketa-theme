import {toRainglowUrl} from './toRainglowUrl'

const input = 'absent.light'

const expected = 'https://raw.githubusercontent.com/rainglow/vscode/master/themes/absent-light.json'


test('', () => {
  expect(
    toRainglowUrl(input)
  ).toBe(expected)
})
