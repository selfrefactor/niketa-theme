import { base, baseRandom, randomShade } from './base'

test('happy', () => {
  base('foo')
})

test('random', () => {
  baseRandom('foo')
})

test('random shade', () => {
  const result = 'foobar'.split('').map(randomShade)
  // console.log({ result })
})
