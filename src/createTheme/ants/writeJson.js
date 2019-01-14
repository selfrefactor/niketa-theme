import { resolve } from 'path'
import { writeFileSync } from 'fs'

const BASE = process.env.NODE_ENV === 'test' ?
  '/home/s/repos/y/niketa-theme/' :
  resolve(__dirname, '..')

export function writeJsonAnt(filePath, obj){
  const resolvedPath = resolve(
    BASE,
    filePath
  )
  console.log({resolvedPath})
  writeFileSync(
    resolvedPath,
    JSON.stringify(obj, null, 2)
  )
}
