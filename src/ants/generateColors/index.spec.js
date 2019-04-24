import { generateColorsAnt } from './'
import { readJsonAnt } from '../readJson'
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
    const setOfColors = piped(
      data[ colorKey ],
      filter(Boolean),
      x => Object.values(x)
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
    '#8e1f2f',
    '#00afd6',
  ]

  expect(
    () => generateColorsAnt({
      input,
      label       : '_HAPPY',
      opacityFlag : true,
      levels      : 60,
    })
  ).not.toThrow()
})

test('random persisted', () => {
  const input = generateRandomPair()
  expect(
    () => generateColorsAnt({
      input,
      label       : '_RANDOM_PERSISTED',
      opacityFlag : true,
      levels      : 20,
    })
  ).not.toThrow()
})

test.only('with static base', () => {
  const [ _, target ] = generateRandomPair()
  const input = [
    '#8e1f2f',
    target,
  ]

  expect(
    () => generateColorsAnt({
      input,
      label       : '_WITH_ONE',
      opacityFlag : true,
      levels      : 10,
    })
  ).not.toThrow()
})

test('random with hash', () => {
  const input = generateRandomPair()
  const label = getLabel()
  console.log({ label })

  expect(
    () => generateColorsAnt({
      input,
      label,
      opacityFlag : true,
      levels      : 200,
    })
  ).not.toThrow()
})
