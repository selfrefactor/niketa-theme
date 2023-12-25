const { existsSync } = require('fs')
const { readFile } = require('fs-extra')
const { scanFolder } = require('helpers-fn')
const { resolve } = require('path')
// check gitignore
// check package.json
const EXPECTED_FILES = [
  'constants.js',
  'lint/lint-all-fn.js',
  'lint/lint-all.js',
  'lint/lint-fn.js',
  'lint/lint-rules.js',
  'lint/lint.js',
  'run/jest-fn.js',
  'run/jest.js',
]

const EXPECTED_GIT_IGNORE = [
  'scripts/outputs/eslint-output-file.txt',
  'scripts/outputs/jest-output-file.txt',
  'scripts/outputs/eslint-all-output-file.txt'
]

const DEPENDANT_REPOS = ['../../niketa-theme']

async function checkDependantRepo(relativePath) {
  try {
    const directoryPath = resolve(__dirname, relativePath)
    const gitIgnoreContent = (await readFile(`${directoryPath}/.gitignore`)).toString()
    if(
      !EXPECTED_GIT_IGNORE.every(x => gitIgnoreContent.includes(x))
    ){
      return { error: `gitignore is not correct` }
    }
    if (!existsSync(directoryPath)) {
      return { error: `Directory ${directoryPath} does not exist` }
    }
    const files = await scanFolder({
      filterFn: (x) => x.endsWith('.js'),
      folder: `${directoryPath}/scripts`,
    })
    console.log(files)
  }catch(err){
    console.log(err)
    return { error: err.message }
  }
}

void (async function checkDependantRepos() {
  const errors = await Promise.all(DEPENDANT_REPOS.map(checkDependantRepo))
  console.log(errors)
})()
