import { generateColorsAnt } from './'
import { readJsonAnt } from '../readJson'
import { translate, translatex } from '../mini/translate'
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
  console.log({
    firstRandomIndex,
    secondRandomIndex,
  })

  return toReturn
}

test('x', () => {
  expect(() => generateRandomPair()).not.toThrow()
})

test('happy', () => {
  const input = [
    // translate('light.green.1'),
    // translate('dark.blue.3'),
    // translate('dark.blue.0'),
    // translate('light.blue.0'),
    // translate('light.blue.9'),
    // translate('teal.0'),
    // translate('teal.7'),
    // translate('dark.green.8'),
    // translate('brown.8'),
    '#e46732',
    // translate('purple.1'),
    '#c30052',
    translate('pink.1'),
  ]

  expect(() =>
    generateColorsAnt({
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
    generateColorsAnt({
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
    generateColorsAnt({
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
    generateColorsAnt({
      input,
      label,
      opacityFlag : true,
      levels      : 200,
    })
  ).not.toThrow()
})
