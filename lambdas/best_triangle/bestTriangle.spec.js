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
const BACKGROUND = '#f3f0e0'

const FILTER_SK = 1
const FILTER_FLAG = 0
const FILTER_LIGHT = 1

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
      x => FILTER_LIGHT ? filterWith('#fff', 1.4)(x) : true
    )

  console.log(
    colorsOrigin.length - filteredColors.length,
    filteredColors.length
  )
  writeJsonAnt('lambdas/best_triangle/colors.json', filteredColors)
})

test('filter after', () => {
  if (!FILTER_SK) return

  const origin = readJsonAnt(SAVED_SK)
  const filteredColors = origin
    .filter(
      x => x.minBetween > 1.08
    )
    .filter(
      x => x.minBackground > 4.2
    )

  console.log(
    origin.length - filteredColors.length,
    filteredColors.length
  )
  writeJsonAnt('lambdas/best_triangle/colors.json', filteredColors)
})

test.skip('happy', async () => {
  if (FILTER_FLAG) return

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
      minBetween : 1.05,
    })
    holder.push(singleResult)
    console.log(singleResult.length)
    console.timeEnd(`iteration-${ i }`)
  }
  console.timeEnd('happy')

  // await mapAsync(singleLoop)(range(0, 2))
  await mapAsync(singleLoop)(range(0, 20))
  const toSave = sort(sortFn)(flatten(holder))
  writeJsonAnt(SAVED_SK, toSave)
})
