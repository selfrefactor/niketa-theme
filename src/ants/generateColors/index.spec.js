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

test.only('happy', () => {
  const input = [ 'red.3', 'brown.1' ]
  expect(
    () => generateColorsAnt({
      input, 
      label :'_HAPPY',
      opacityFlag: true,
      levels:40
    })
  ).not.toThrow()
  
  const sk = readJsonAnt(
    'src/ants/generateColors/colors/_PERSISTED_COLORS.json'
  )

  console.log({ sk : sk.length })
})

test('change every time', () => {
  const input = generateRandomPair()
  expect(
    () => generateColorsAnt({
      input, 
      label :'_RANDOM_PERSISTED',
      opacityFlag: true,
      levels:40
    })
  ).not.toThrow()
})

test('change every time', () => {
  const [ _, target ] = generateRandomPair()
  const input = [
    '#fafafa11',
    target,
  ]

  expect(
    () => generateColorsAnt({
      input, 
      label :'_WITH_ONE',
      opacityFlag: true,
      levels:100
    })
  ).not.toThrow()
})

test('random', () => {
  const input = generateRandomPair()
  
  expect(
    () => generateColorsAnt({
      input, 
      label :getLabel(),
      opacityFlag: true,
      levels:200
    })
  ).not.toThrow()
})
