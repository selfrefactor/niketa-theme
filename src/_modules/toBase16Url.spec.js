import {toBase16Url} from './toBase16Url'

const input = 'railscasts-light'

const expected = 'https://raw.githubusercontent.com/riesinger/base16-vscode/master/themes/railscasts-light.json'


test('', () => {
  expect(
    toBase16Url(input)
  ).toBe(expected)
})
