const { mapAsync } = require('rambdax')
const { lintFn } = require('./lint-fn.js')
const { scanFolder } = require('helpers-fn')
const { writeFileSync } = require('fs-extra')
const { OUTPUT_LINT_ALL_FILE } = require('../constants.js')

const filterFn = filePath => filePath.endsWith('.js')

async function lintFolder(folder) {
  console.log(`Linting ${folder}`)
  const files = await scanFolder({
    filterFn,
    folder,
  })
  const result = await mapAsync(async (filePath) => {
    const lintResults = await lintFn(filePath)
    const filtered = lintResults.filter(Boolean)
    if (filtered.length === 0) return ''

    return `
File: ${filePath}

Lint result: 

${lintResults.join('\n')}
------------------------
    `.trim()
  }, files)

  return result.filter(Boolean).join('\n')
}

async function lintAllFn() {
  const {
    lintAllFolders: lintAllFoldersInit,
  } = require('../../../package.json')
  const lintAllFolders = lintAllFoldersInit || ['src']

  const result = await mapAsync(lintFolder, lintAllFolders)
  writeFileSync(OUTPUT_LINT_ALL_FILE, result.join('\n'), 'utf8')

  console.log('===========DONE============')
  console.log(result.join('\n'))
}

exports.lintAllFn = lintAllFn
