import {requestThemeJson, schema} from './requestThemeJson'
import {isAttach} from 'rambdax'

const input = 'https://raw.githubusercontent.com/rainglow/vscode/master/themes/absent-light.json'

isAttach()
test('', async  () => {

  const result = await requestThemeJson(input)
  expect(
    result.is(schema)
  ).toBe(true)
})

