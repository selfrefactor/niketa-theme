const FALLBACK = 'src/create-multiple-theme.spec.js'
const filePath = process.argv[2] ?? FALLBACK
const { lintFn } = require('./lint-fn.js')

void (async function lint() {
  await lintFn(filePath)
})()
