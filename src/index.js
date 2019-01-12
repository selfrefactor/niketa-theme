// process.env.DISABLE_LOG_FLAG === 'true'

console.log = process.env.DISABLE_LOG_FLAG === 'true' ?
  () => {} :
  console.log

require('./createTheme/prove')

// import { rabbitHole } from './_modules/rabbitHole'
// rabbitHole()
