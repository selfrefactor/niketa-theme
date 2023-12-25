const { existsSync } = require('fs')
const { execSafe } = require('helpers-fn')
let { resolve } = require('path')

const PRETTIER = 'node_modules/prettier/bin/prettier.cjs'
const ESLINT = 'node_modules/eslint/bin/eslint.js'
const JEST = 'node_modules/jest/bin/jest.js'
const cwd = resolve(__dirname, '../')

let eslintConfig = `${cwd}/.eslintrc.js`

async function exec(command) {
  try {
    await execSafe({ command, cwd })
  } catch (error) {
    console.log(error.stdout, error.stderr)
  }
}

async function check() {
  if (!existsSync(`${cwd}/${ESLINT}`)) {
    console.log('eslint not found', `${cwd}/${ESLINT}`)
    return false
  }

  if (!existsSync(`${cwd}/${PRETTIER}`)) {
    console.log('prettier not found', `${cwd}/${PRETTIER}`)
    return false
  }
  if (!existsSync(eslintConfig)) {
    console.log('eslint config found', eslintConfig)
    return false
  }
  if (!existsSync(`${cwd}/${JEST}`)) {
    console.log('jest not found', `${cwd}/${JEST}`)
    return false
  }
  return true
}

let OUTPUT_LINT_FILE_NAME = `eslint-output-file.txt`
let OUTPUT_LINT_FILE = `${__dirname}/outputs/${OUTPUT_LINT_FILE_NAME}`
let OUTPUT_JEST_FILE_NAME = `jest-output-file.txt`
let OUTPUT_JEST_FILE = `${__dirname}/outputs/${OUTPUT_JEST_FILE_NAME}`

exports.ESLINT = ESLINT
exports.JEST = JEST
exports.OUTPUT_JEST_FILE = OUTPUT_JEST_FILE
exports.OUTPUT_LINT_FILE = OUTPUT_LINT_FILE
exports.PRETTIER = PRETTIER
exports.check = check
exports.cwd = cwd
exports.eslintConfig = eslintConfig
exports.exec = exec
exports.OUTPUT_LINT_ALL_FILE = `${__dirname}/outputs/eslint-all-output-file.txt`
