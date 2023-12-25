const {
  check,
  ESLINT,
  eslintConfig,
  exec,
  OUTPUT_LINT_FILE,
  PRETTIER,
} = require('../constants')
const { readFileSync } = require('fs')

async function lintFileWithPrettier(filePath) {
  const command = `${PRETTIER} --write ${filePath} --print-width=80 --semi=false --jsx-single-quote ${
		filePath.endsWith('.scss') ? '' : '--single-quote'
	}`
  await exec(command)
}

async function lintFileWithEslint(filePath) {
  const label = `${filePath} - eslint`
  // need to run with execa to test error output
  const baseCommand = `${ESLINT} --fix ${filePath} --config ${eslintConfig}`
  const command = `${baseCommand} > ${OUTPUT_LINT_FILE}`
  await exec(command)
  console.time(label)
  console.log(baseCommand)
  const output = readFileSync(OUTPUT_LINT_FILE, 'utf8')
  console.timeEnd(label)
  if (!output) {
    console.log('ESLINT: OK')
    return 'OK'
  }
  console.log(output)
  return output
}

async function biome(filePath) {
  const command = `node_modules/@biomejs/biome/bin/biome check --apply ${filePath}`
  await exec(command)
}

async function lintFn(filePath) {
  if (!(await check())) process.exit(1)

  await lintFileWithPrettier(filePath)
  await biome(filePath)
  return lintFileWithEslint(filePath)
}

exports.lintFn = lintFn
