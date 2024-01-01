const { check, exec, JEST, OUTPUT_JEST_FILE } = require('../constants')
const { readFileSync } = require('fs')

async function runJestWithFile(filePath) {
  const label = `${filePath} - jest`
  const command = `${JEST} ${filePath} > ${OUTPUT_JEST_FILE}`
  console.time(label)
  console.log(command)
  const { errorMessage, success } = await exec(command)
  if (success) {
    const output = readFileSync(OUTPUT_JEST_FILE, 'utf8')
    if (!output) {
      console.log('JEST: OK')
    }
    else {
      console.log(output)
    }
  }
  else {
    console.log('JEST: ERROR', errorMessage)
  }
  console.timeEnd(label)
}

async function runJestFn(filePath) {
  if (!(await check())) process.exit(1)
  await runJestWithFile(filePath)
}

exports.runJestFn = runJestFn
