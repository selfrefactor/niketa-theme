import { range } from 'rambdax'
import { getCombinations } from './permutation'

test('happy', () => {
  const list = []
  console.log(
    getCombinations(range(0, 10), 3, list)
  )
  console.log(list)

})
