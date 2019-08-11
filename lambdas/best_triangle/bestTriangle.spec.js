import { writeJsonAnt } from '../../src/ants/writeJson'
import { readJsonAnt } from '../../src/ants/readJson'
import { mapAsync, range, shuffle, flatten, take, sort } from 'rambdax'
import {
  SAVED_SK,
  sortFn,
  findBestTriangle,
  filterWith,
  calculateTriangleScore,
  withLocalColors,
} from './bestTriangle'
import colorsOrigin from './colorsOrigin.json'
import importedColors from './colors.json'
const BACKGROUND = '#f4f1e3'

const FILTER_SK = 1
const FILTER_FLAG = 0

test.skip('calculate triangle score', () => {
  console.log(
    calculateTriangleScore(
      '#1E416E',
      '#38978D',
      '#B97444',
      '#f9f6f1'
    )
  )
})

test('filter before', () => {
  if (!FILTER_FLAG || FILTER_SK) return

  const filteredColors = colorsOrigin
    .filter(
      filterWith('#f4f1e3', 4.7)
    )

  console.log(
    colorsOrigin.length - filteredColors.length,
    filteredColors.length
  )
  writeJsonAnt('lambdas/best_triangle/colors.json', filteredColors)
})

test('filter after', () => {
  if (!FILTER_SK) return
  jest.setTimeout(20 * 60 * 1000)
  const origin = readJsonAnt(SAVED_SK)
  const filteredColors = origin
    .filter(
      x => x.minBetween > 1.47
    )
    .filter(
      x => x.minBackground > 4.2
    )

  console.log(
    origin.length - filteredColors.length,
    filteredColors.length
  )
  writeJsonAnt('lambdas/best_triangle/after.json', filteredColors)
})

test('happy', async () => {
  if (FILTER_FLAG || FILTER_SK) return

  jest.setTimeout(20 * 60 * 1000)
  const LIMIT = 80
  const holder = []

  console.time('happy')
  const singleLoop = async i => {
    console.time(`iteration-${ i }`)
    const colors = take(LIMIT, shuffle(importedColors))
    const singleResult = await findBestTriangle({
      colors,
      background : BACKGROUND,
      minBetween : 1.08,
    })
    holder.push(singleResult)
    console.log(singleResult.length)
    console.timeEnd(`iteration-${ i }`)
  }
  console.timeEnd('happy')

  await mapAsync(singleLoop)(range(0, 2))
  const toSave = sort(sortFn)(flatten(holder))
  console.log(toSave.length)
  writeJsonAnt(SAVED_SK, toSave)
})
