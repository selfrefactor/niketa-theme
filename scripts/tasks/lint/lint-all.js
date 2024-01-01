const { lintAllFn } = require('./lint-all-fn.js')

void (async function lintAll() {
  await lintAllFn()
})()
