import { generateBase, generateBaseRandom } from './generateBase'
import {
  equals,
  flatten,
  range,
  shuffle,
  sort,
  uniqBy,
} from 'rambdax'

test.skip('happy', () => {
  generateBase('boring')
})

test.skip('random', () => {
  expect(() => generateBaseRandom('sk')).not.toThrow()
})

// function isUniq(x, holder){
//   const [ found ] = holder.filter(holderInstance => equals(holderInstance, x))

//   return !found
// }

// function pushUniq(x, holder){
//   if (!isUniq(x, holder)) return
//   holder.push(x)
// }

const PERMUTATION_BASE = [
  'COLOR_0',
  'COLOR_1',
  'COLOR_2',
  'COLOR_3',
  'COLOR_4',
  'COLOR_5',
]

function permutation(levels = 5){
  const holder = []
  const sk = new Set()
  range(0, levels).forEach(_ => {
    const mystery = JSON.stringify(shuffle(PERMUTATION_BASE))
    sk.add(mystery)
  })

  sk.forEach(x => {
    holder.push(JSON.parse(x))
  })

  return holder
}

test.only('fair random', () => {
  const setOfRandoms = permutation(20)

  // expect().toBe()
})

test('with permutation', () => {
  const setOfRandoms = permutation(20)

  expect(() => {
    setOfRandoms.forEach(
      (singleSet, i) => generateBaseRandom(`_${ i }`, singleSet)
    )
  }).not.toThrow()
})

