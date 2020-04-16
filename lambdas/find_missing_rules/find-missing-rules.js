import { outputJson, readJson } from 'fs-extra'
import { filter, flatten, trim, uniq } from 'rambdax'

import { readJsonAnt } from '../../src/ants/readJson'

function isBadScope(scope){
  if (scope.includes(' .')) return true
  if (scope.includes(' - ')) return true

  return false
}

function removeBadScopes(scopes){
  return scopes.filter(x => !x.endsWith('.jsx') && !x.endsWith('.tsx'))
}

function extractRules(scope){
  if (Array.isArray(scope)) return scope.map(extractRules)
  if (typeof scope !== 'string') throw new Error('scope must be a string')
  if (isBadScope(scope)) return []

  return scope.includes(',') ?
    scope.split(',').map(trim) :
    scope.split(' ').map(trim)
}

function getAllScopes(tokenColors){
  let toReturn = []

  tokenColors.forEach(({ scope }) => {
    const languageRules = extractRules(scope)
    toReturn = [ ...toReturn, ...languageRules ]
  })

  return removeBadScopes(uniq(flatten(toReturn)))
}

const MISSING_SCOPES = `${ __dirname }/missingScopes.json`
const MISSING_COLORS = `${ __dirname }/missingColors.json`

export async function findMissingRules(label = 'lukin'){
  const foreign = await readJson(`${ __dirname }/assets/${ label }.json`)
  const local = await readJsonAnt('themes/CommunicationBreakdown.json')
  const currentMissingScopes = await readJsonAnt(MISSING_SCOPES)
  const currentMissingColors = await readJsonAnt(MISSING_COLORS)

  console.log(currentMissingScopes.missingScopes[ 0 ])
  console.log(currentMissingScopes.missingScopes.length)

  const foreignScopes = getAllScopes(foreign.tokenColors)
  const localScopes = getAllScopes(local.tokenColors)

  const allScopes = [ ...currentMissingScopes.missingScopes, ...localScopes ]
  const allColors = {
    ...currentMissingColors.missingColors,
    ...local.colors,
  }

  const missingScopes = foreignScopes.filter(x => !allScopes.includes(x))
  const missingColors = filter((x, prop) => {
    if (allColors[ prop ]) return false

    return x
  })(foreign.colors)

  console.log(localScopes.length)
  console.log(foreignScopes.length)
  console.log(missingScopes.length)
  console.log(Object.keys(local.colors).length)
  console.log(Object.keys(foreign.colors).length)
  console.log(Object.keys(missingColors).length)

  if (Object.keys(missingColors).length > 1){
    await outputJson(
      `${ __dirname }/missingColors.json`,
      {
        missingColors : {
          ...currentMissingColors.missingColors,
          ...missingColors,
        },
      },
      { spaces : 2 }
    )
  }

  if (missingScopes.length > 1){
    await outputJson(
      MISSING_SCOPES,
      {
        missingScopes : [
          ...currentMissingScopes.missingScopes,
          ...missingScopes,
        ],
      },
      { spaces : 2 }
    )
  }

  expect({
    missingScopes,
    missingColors,
  }).toMatchSnapshot()
}
