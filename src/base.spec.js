import { base, baseRandom, randomShade } from './base'

test('happy', () => {
  base('boring')
})

test.skip('random', () => {
  [ 'first', 'second', 'third', 'x', 'y', 'z' ].map(x => baseRandom(x))
})

test('random shade', () => {
  const result = 'foobar'.split('').map(randomShade)
  console.log({ result })
})

