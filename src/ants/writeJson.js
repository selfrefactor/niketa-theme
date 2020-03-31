import { outputFileSync } from 'fs-extra'
import { resolve } from 'path'

const BASE = resolve(__dirname, '../../')

export function writeJsonAnt(filePath, obj){
  const resolvedPath = resolve(BASE, filePath)

  outputFileSync(resolvedPath, JSON.stringify(
    obj, null, 2
  ))
}
