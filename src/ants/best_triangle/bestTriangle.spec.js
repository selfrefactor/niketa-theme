import { writeJsonAnt } from '../../ants/writeJson'
import { filter, mapAsync, range, shuffle, flatten, take, sort } from 'rambdax'
import {
  SAVED_SK,
  sortFn,
  findBestTriangle,
  isTooLight,
  withLocalColors,
} from './bestTriangle'
import importedColors from './colors.json'

test('filter out dark colors', () => {
  // expect().toBe()
})

test.skip('happy', async () => {
  jest.setTimeout(20 * 60 * 1000)
  const LIMIT = 80
  const holder = []
  console.time('happy')
  const singleLoop = async i => {
    console.time(`iteration-${ i }`)
    const colors = take(LIMIT, shuffle(importedColors))
    const singleResult = await findBestTriangle({
      colors,
      minBetween    : 2.05,
      minBackground : 2.05,
    })
    holder.push(singleResult)
    console.log(singleResult.length)
    console.timeEnd(`iteration-${ i }`)
  }
  console.timeEnd('happy')

  await mapAsync(singleLoop)(range(0, 20))
  const toSave = sort(sortFn)(flatten(holder))
  writeJsonAnt(SAVED_SK, toSave)
})

/*
// const FORBIDDEN = []
const FORBIDDEN = [ '#8bc3c7', '#B6A3CB', '#22049F', '#043BA2', '#0418C1', '#f38b80' ]
const predicate = x => {
  const passForbidden = filter(a => FORBIDDEN.includes(a), x.COLORS)
  if (Object.keys(passForbidden).length > 0) return false
  if (x.minBetween < 1.8) return false
  // if (x.minBackground < 2) return false
  const numLights = filter(isTooLight, x.COLORS)

  return Object.keys(numLights).length === 0
}
predicate      : filter(predicate),
*/
