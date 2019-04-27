import { resolve as resolveMethod } from 'path'
import { readFileSync } from 'fs'

const BASE = process.env.NODE_ENV === 'test' ?
  '/home/s/repos/niketa-theme/' :
  resolve(__dirname, '..')

export const resolve = filePath => resolveMethod(
  BASE,
  filePath
)

export function readJsonAnt(filePath){
  const resolvedPath = resolve(
    filePath
  )
  const content = readFileSync(resolvedPath).toString()

  return JSON.parse(content)
}
