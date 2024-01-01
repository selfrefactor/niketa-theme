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
  const baseCommand = `${ESLINT} --fix ${filePath} --config ${eslintConfig}`
  const command = `${baseCommand} > ${OUTPUT_LINT_FILE}`
  await exec(command)
  console.time(label)
  const output = readFileSync(OUTPUT_LINT_FILE, 'utf8')
  console.timeEnd(label)
  console.log(`\nLint command:  ${baseCommand}\n`)
  return output ?? false
}

async function biome(filePath) {
  const label = `${filePath} - biome`
  console.time(label)
  const command = `node_modules/@biomejs/biome/bin/biome check --apply-unsafe ${filePath}`
  const { errorMessage, success } = await exec(command)
  console.timeEnd(label)
  return errorMessage ?? false
}

async function lintFn(filePath) {
  if (!(await check())) process.exit(1)

  await lintFileWithPrettier(filePath)
  const biomeOutput = await biome(filePath)
  const lintOutput = await lintFileWithEslint(filePath)

  return [biomeOutput, lintOutput]
}

exports.lintFn = lintFn
