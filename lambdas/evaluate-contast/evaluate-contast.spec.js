import { evaluateContrast } from './evaluate-contast'

test('happy', async () => {
  let result = await evaluateContrast()
  console.log(result, `result`)
})
