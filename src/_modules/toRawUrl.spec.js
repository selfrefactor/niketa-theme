import {toRawUrl} from './toRawUrl'

const input = 'https://github.com/jolaleye/horizon-theme-vscode/blob/master/themes/horizon.json'

const expected = 'https://raw.githubusercontent.com/jolaleye/horizon-theme-vscode/master/themes/horizon.json'


test('', () => {
  expect(
    toRawUrl(input)
  ).toBe(expected)
})
