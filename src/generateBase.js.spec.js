import { generateBase, baseRandom, randomShade } from './generateBase'

test('happy', () => {
  generateBase('boring')
})

const LIST = [ 'first', 'second', 'third', 'x', 'y', 'z', 'john', 'paul', 'jones' ]

test.skip('random', () => {
  LIST.map(x => baseRandom(x))
})

test('random shade', () => {
  const result = 'foobar'.split('').map(randomShade)
  console.log({ result })
})

