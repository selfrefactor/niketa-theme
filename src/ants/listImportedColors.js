import importedColors from '../../colors.json'
import { filter } from 'rambdax'

export function listImportedColorsAnt(){
  const keys = Object.keys(importedColors)
  const holder = []
  keys.forEach(key => {
    const filtered = filter(
      x => x.length > 0
    )(importedColors[ key ])
    const len = Object.keys(filtered).length
    if (!len) return
    holder.push(
      `${ key } - ${ len - 1 }`
    )
  })

  return holder.sort((a, b) => a > b ? 1 : -1)
}
