import importedColors from '../../colors.json'

export function sortColors(){
  const keys = Object.keys(importedColors)

  keys.forEach(key => {
    const all = Object.values(importedColors[key]).map(x => x.toLowerCase())
    all.sort((a,b) => a > b ? 1 : -1)
    
    const newColor = {}
    all.forEach((sortedColor, i) => {
      newColor[i] = sortedColor
    })
    console.log({newColor})
  })
}