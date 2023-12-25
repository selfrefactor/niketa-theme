const { mapAsync } = require('rambdax')
const { lintFn } = require('./lint-fn.js')
const { scanFolder } = require('helpers-fn')
const { writeFileSync } = require('fs-extra')
const { OUTPUT_LINT_ALL_FILE } = require('../constants.js')

let filterFn = (filePath) => filePath.endsWith('.js')

async function lintFolder(folder) {
  console.log(`Linting ${folder}`)
  const files = await scanFolder({
    filterFn,
    folder,
  })
  const result = await mapAsync(async (filePath) => {
    let lintResult = await lintFn(filePath)
    if (lintResult === 'OK') return ''

    return `
File: ${filePath}

Lint result: 

${lintResult}
------------------------
    `.trim()
  }, files)

  return result.filter(Boolean).join('\n')
}

async function lintAllFn() {
  const { lintAllFolders: lintAllFoldersInit } = require('../../package.json')
  const lintAllFolders = lintAllFoldersInit || ['src']

  const result = await mapAsync(lintFolder, lintAllFolders)
  writeFileSync(OUTPUT_LINT_ALL_FILE, result.join('\n'), 'utf8')
}

exports.lintAllFn = lintAllFn
