const { readJson } = require('fs-extra')
const { resolve: resolveMethod } = require('path')
const BASE = resolveMethod(__dirname, '../../')

const resolve = filePath => resolveMethod(BASE, filePath)

async function readJsonAnt(filePath){
  const resolvedPath = resolve(filePath)
  const content = await readJson(resolvedPath)

  return content
}

exports.resolve = resolve
exports.readJsonAnt = readJsonAnt
