const { existsSync } = require('fs')
const { execSafe } = require('helpers-fn')
const { resolve } = require('path')

const cwd = resolve(__dirname, '../../')
const PRETTIER = 'node_modules/prettier/bin/prettier.cjs'
const ESLINT = 'node_modules/eslint/bin/eslint.js'
const JEST = 'node_modules/jest/bin/jest.js'

const eslintConfig = `${cwd}/.eslintrc.js`

async function exec(command) {
  try {
    await execSafe({ command, cwd })
    return { success: true }
  }
  catch (error) {
    return {
      errorMessage: error?.message ?? JSON.stringify(error, null, 2),
      success: false,
    }
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

exports.ESLINT = ESLINT
exports.JEST = JEST
exports.PRETTIER = PRETTIER
exports.check = check
exports.cwd = cwd
exports.eslintConfig = eslintConfig
exports.exec = exec
exports.OUTPUT_LINT_FILE = `${__dirname}/outputs/eslint-output-file.txt`
exports.OUTPUT_JEST_FILE = `${__dirname}/outputs/jest-output-file.txt`
exports.OUTPUT_LINT_ALL_FILE = `${__dirname}/outputs/eslint-all-output-file.txt`
