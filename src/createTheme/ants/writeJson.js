import { resolve } from 'path'
import { writeFileSync } from 'fs'

const BASE = resolve(__dirname, '../')

export function writeJsonAnt(filePath, obj){
  const resolvedPath = resolve(
    BASE,
    filePath
  )
  writeFileSync(
    resolvedPath,
    JSON.stringify(obj)
  )
}
