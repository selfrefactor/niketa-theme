const { readFileSync } = require('fs')
const { resolve: resolveMethod } = require('path')
const BASE = resolveMethod(__dirname, '../../')

export const resolve = filePath => resolveMethod(BASE, filePath)

export function readJsonAnt(filePath){
  const resolvedPath = resolve(filePath)
  const content = readFileSync(resolvedPath).toString()

  return JSON.parse(content)
}
