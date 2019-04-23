import importedColors from '../../colors.json'
import { writeJsonAnt } from './writeJson.js'
import hexSorter from 'hexsorter'
import { sort } from 'rambdax'

export function compareColors(colors){
  const compareColors = (a, b) => {
    if (!a) return 1
    if (!b) return -1
    if (a.length === 9){
      if (b.length === 9){
        return a > b ?
          -1 :
          1
      }

      return -1
    }

    if (b.length === 9) return 1

    const brighter = hexSorter.mostBrightColor([ a, b ])

    return brighter === a ? -1 : 1
  }

  return sort(compareColors, colors)
}

export function sortColorsAnt(){
  const keys = Object.keys(importedColors)
  const sortedColors = {}
  keys.forEach(key => {
    const all = Object.values(importedColors[ key ]).map(x => x.toLowerCase())
    all.sort((a, b) => {
      if (!a) return 1
      if (!b) return -1

      const brighter = hexSorter.mostBrightColor([ a, b ])

      return brighter === a ? -1 : 1
    })

    const newColor = {}
    all.forEach((sortedColor, i) => {
      newColor[ i ] = sortedColor
    })
    sortedColors[ key ] = newColor
  })

  writeJsonAnt(
    'colors.json',
    sortedColors
  )

  return sortedColors
}
