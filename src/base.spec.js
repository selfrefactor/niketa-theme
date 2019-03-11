import { base, baseRandom, randomShade } from './base'

test('happy', () => {
  base('foo')
})

test('random', () => {
  [ 'foo', 'bar', 'baz' ].map(x => baseRandom(x))
})

test('random shade', () => {
  const result = 'foobar'.split('').map(randomShade)
  console.log({ result })
})
