import { generateBase, generateBaseRandom } from './generateBase'
import {
  map,
  range,
  mergeAll,
  shuffle,
} from 'rambdax'

test('happy', () => {
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

function permutation(levels = 5, permutationBase = PERMUTATION_BASE){
  const holder = []
  const sk = new Set()
  range(0, levels).forEach(_ => {
    const mystery = JSON.stringify(shuffle(permutationBase))
    sk.add(mystery)
  })

  sk.forEach(x => {
    holder.push(JSON.parse(x))
  })

  return holder
}

function applyFairness({setOfRandoms, accordingTo, levels}){
  const refereeRaw = map(
    x => ({[x]: 0})
  )(accordingTo)

  const referee = mergeAll(refereeRaw)
  const toReturn = []

  setOfRandoms.forEach(singleRandomSet => {
    const [first] = singleRandomSet

    const currentLevel = referee[first]
    if(currentLevel<= levels){
      
      referee[first] = referee[first] + 1
      toReturn.push(singleRandomSet)
    }
  })

  return toReturn
}


test.skip('with permutation', () => {
  const setOfRandoms = permutation(20)

  expect(() => {
    setOfRandoms.forEach(
      (singleSet, i) => generateBaseRandom(`_${ i }`, singleSet)
    )
  }).not.toThrow()
})

test.skip('fair random', () => {
  const setOfRandomsRaw = permutation(100)
  const setOfRandoms = applyFairness({
    setOfRandoms: setOfRandomsRaw,
    levels:4, 
    accordingTo: PERMUTATION_BASE
  })

  expect(() => {
    setOfRandoms.forEach(
      (singleSet, i) => generateBaseRandom(`_${ i }`, singleSet)
    )
  }).not.toThrow()
})


