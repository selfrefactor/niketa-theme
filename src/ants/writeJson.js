import { resolve } from 'path'
import { outputFileSync } from 'fs-extra'

const BASE = process.env.NODE_ENV === 'test' ?
  '/home/s/repos/y/niketa-theme/' :
  resolve(__dirname, '..')

export function writeJsonAnt(filePath, obj){
  const resolvedPath = resolve(
    BASE,
    filePath
  )
  outputFileSync(
    resolvedPath,
    JSON.stringify(obj, null, 2)
  )
}
