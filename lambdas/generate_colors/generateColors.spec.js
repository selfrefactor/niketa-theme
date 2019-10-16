import { generateColors } from './generateColors'
import { readJsonAnt } from '../../src/ants/readJson'
import { translate } from '../../src/ants/mini/translate'
import {
  random,
  shuffle,
  filter,
  flatten,
  mapToObject,
  piped,
} from 'rambdax'

const getLabel = () => random(1000, 9999)

function generateRandomPair(){
  const data = readJsonAnt('colors.json')

  const predicate = colorKey => {
    const setOfColors = piped(data[ colorKey ], filter(Boolean), x =>
      Object.values(x)
    )

    return { [ colorKey ] : setOfColors }
  }

  const mapped = mapToObject(predicate, Object.keys(data))
  const result = flatten(Object.values(mapped))
  const randomized = shuffle(result)
  const firstRandomIndex = random(0, randomized.length - 1)
  const secondRandomIndex = random(0, randomized.length - 1)

  const toReturn = [
    randomized[ firstRandomIndex ],
    randomized[ secondRandomIndex ],
  ]

  return toReturn
}

test('x', () => {
  expect(() => generateRandomPair()).not.toThrow()
})

test('happy', () => {
  const input = [
    '#9e386a',
    '#283593',
    translate('pink.1'),
  ]

  expect(() =>
    generateColors({
      input,
      label       : '_HAPPY',
      opacityFlag : false,
      levels      : 60,
    })
  ).not.toThrow()
})

test.skip('random persisted', () => {
  const input = generateRandomPair()
  expect(() =>
    generateColors({
      input,
      label       : '_RANDOM_PERSISTED',
      opacityFlag : true,
      levels      : 20,
    })
  ).not.toThrow()
})

test.skip('with static base', () => {
  const [ _, target ] = generateRandomPair()
  const input = [
    translate('purple.2'),
    target,
    '#8994bd',
    // target,
  ]

  expect(() =>
    generateColors({
      input,
      label       : '_WITH_ONE',
      opacityFlag : true,
      levels      : 10,
    })
  ).not.toThrow()
})

test.skip('random with hash', () => {
  const input = generateRandomPair()
  const label = getLabel()
  console.log({ label })

  expect(() =>
    generateColors({
      input,
      label,
      levels : 200,
    })
  ).not.toThrow()
})
