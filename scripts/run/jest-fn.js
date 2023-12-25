const { check, exec, JEST, OUTPUT_JEST_FILE } = require('../constants')
const { readFileSync } = require('fs')

async function runJestWithFile(filePath) {
  const label = `${filePath} - jest`
  const command = `${JEST} ${filePath} > ${OUTPUT_JEST_FILE}`
  await exec(command)
  console.time(label)
  const output = readFileSync(OUTPUT_JEST_FILE, 'utf8')
  console.log(command)
  console.timeEnd(label)
  if (!output) {
    console.log('JEST: OK')
    return
  }
  console.log(output)
}

async function runJestFn(filePath) {
  if (!(await check())) process.exit(1)
  await runJestWithFile(filePath)
}

exports.runJestFn = runJestFn
