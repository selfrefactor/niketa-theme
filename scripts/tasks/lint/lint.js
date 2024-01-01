const FALLBACK = 'src/combinatorics-contast.js'
const filePath = process.argv[2] ?? FALLBACK
const { lintFn } = require('./lint-fn.js')

void (async function lint() {
  const lintOutputs = await lintFn(filePath)
  const filtered = lintOutputs.filter(Boolean)
  if (filtered.length === 0) {
    console.log('OK')
    return
  }
  console.log(filtered.join('\n'))
})()
