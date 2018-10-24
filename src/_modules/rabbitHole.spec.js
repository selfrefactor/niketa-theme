import {rabbitHole} from './rabbitHole'

test('', async  () => {

  const result = await rabbitHole()
  
  expect(
    result
  ).toBe(true)
})

