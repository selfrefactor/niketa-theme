let FALLBACK = 'src/generate_colors/generate-colors.spec.js'
const filePath = process.argv[2] ?? FALLBACK
const { runJestFn } = require('./jest-fn.js')

void (async function runJest() {
  await runJestFn(filePath)
})()
