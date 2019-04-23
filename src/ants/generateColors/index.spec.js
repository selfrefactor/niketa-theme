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
  const input = [ '#64c2ba', 'ochra.3' ]
  expect(() => generateColorsAnt(input, false, '_PERSISTED')).not.toThrow()
  const sk = readJsonAnt(
    'src/ants/generateColors/colors/_PERSISTED_COLORS.json'
  )

  console.log({ sk : sk.length })
})

test('change every time', () => {
  const input = generateRandomPair()
  expect(
    () => generateColorsAnt(input, true, '_RANDOM_PERSISTED')
  ).not.toThrow()
})

test.only('change every time', () => {
  const [ _, target ] = generateRandomPair()
  const input = [
    '#fafafa11',
    target,
  ]

  expect(
    () => generateColorsAnt(input, true, '_WITH_ONE')
  ).not.toThrow()
})

test('random', () => {
  const input = generateRandomPair()
  console.log({ input })
  expect(
    () => generateColorsAnt(input, true, getLabel())
  ).not.toThrow()
})
