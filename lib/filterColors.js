import { compose, filter, uniq } from 'rambdax'
const getContrastRatio = require('get-contrast-ratio')

function getContrast(a, b){
  return getContrastRatio.default(a, b)
}

export function filterWith(base, limit){
  return color => getContrast(color, base) > limit
}

export function filterAgainst(base, limit){
  return color => getContrast(color, base) < limit
}

export function filterColors({ colors, blackTolerance, blueTolerance, redTolerance }){
  return compose(
    filter(filterWith('#000', blackTolerance)),
    filter(filterWith('#00f', blueTolerance)),
    filter(filterWith('#f00', redTolerance)),
    uniq,
  )(colors)
}
