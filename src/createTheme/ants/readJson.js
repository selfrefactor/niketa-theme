import { resolve } from 'path'
import { readFileSync } from 'fs'

const BASE = resolve(__dirname, '../')

export function readJsonAnt(filePath){
  const resolvedPath = resolve(
    BASE,
    filePath
  )
  const content = readFileSync(resolvedPath).toString()

  return JSON.parse(content)
}
