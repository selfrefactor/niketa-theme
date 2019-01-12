import { resolve } from 'path'
import { readFileSync } from 'fs'

const BASE = resolve(__dirname, '../')
console.log({ BASE })

export function readJsonAnt(filePath){
  const resolvedPath = resolve(
    BASE,
    filePath
  )
  const content = readFileSync(resolvedPath).toString()

  return JSON.parse(content)
}
