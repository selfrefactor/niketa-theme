import { is } from 'rambdax'
import {rabbitHole} from './rabbitHole'

test('', async  () => {
  const schema = {
    label: 'string',
    uiTheme: ['vs','vs-dark'],
    path: 'string',
  }  

  const themes = await rabbitHole()

  expect(
    is(themes)([schema])
  ).toBe(true)
})

