const FALLBACK = 'src/evaluate-contast.spec.js'
const filePath = process.argv[2] ?? FALLBACK
const { runJestFn } = require('./jest-fn.js')

void (async function runJest() {
  await runJestFn(filePath)
})()
