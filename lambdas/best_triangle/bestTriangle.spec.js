import { writeJsonAnt } from '../../src/ants/writeJson'
import { mapAsync, range, shuffle, flatten, take, sort } from 'rambdax'
import {
  SAVED_SK,
  sortFn,
  findBestTriangle,
  filterWith,
  filterAgainst,
  withLocalColors,
} from './bestTriangle'
import colorsOrigin from './colorsOrigin.json'
import importedColors from './colors.json'
const BACKGROUND = '#f3f0e0'
const DARK_BACKGROUND = '#2A3343'

const FILTER_FLAG = 0
const FILTER_LIGHT = 0

test('filter colors', () => {
  if (!FILTER_FLAG) return

  const filteredColors = colorsOrigin
    .filter(
      x => FILTER_LIGHT ? filterWith('#fff', 1.4)(x) : true
    )
    .filter(
      // filterAgainst(DARK_BACKGROUND, 4.05)
      filterWith(DARK_BACKGROUND, 4.05)
    )
  
  console.log(
    colorsOrigin.length - filteredColors.length,
    filteredColors.length
  )  
  writeJsonAnt('src/ants/best_triangle/colors.json', filteredColors)
})

test('happy', async () => {
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
      minBetween : 2.05,
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
