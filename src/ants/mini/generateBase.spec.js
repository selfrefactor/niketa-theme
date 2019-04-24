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

function isUniq(x, holder){
  const [found] = holder.filter(holderInstance => equals(holderInstance,x))
  return !found
}

function pushUniq(x, holder){
  if(!isUniq(x,holder)) return
  holder.push(x)
}

const PERMUTATION_BASE = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
]

function permutation(){
  const holder = []
  
  range(0,100).forEach(_ => {
    pushUniq(
      shuffle(PERMUTATION_BASE),
      holder
    )
  });

  return holder
}

test('random', () => {
  const x = permutation()
  console.log({x, sk: x.length})
  // expect(() => generateBaseRandom('sk')).not.toThrow()
})

