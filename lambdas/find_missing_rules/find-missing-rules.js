import { outputJson, readJson } from 'fs-extra'
import { filter, flatten, trim, uniq } from 'rambdax'

import { readJsonAnt } from '../../src/ants/readJson'

function isBadScope(scope){
  if (scope.includes(' .')) return true
  if (scope.includes(' - ')) return true

  return false
}

function removeBadScopes(scopes){
  return scopes.filter(x => !x.endsWith('.jsx') && !x.endsWith('.tsx') && !x.endsWith('.ts'))
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

  const foreignScopes = getAllScopes(foreign.tokenColors)
  const localScopes = getAllScopes(local.tokenColors)

  const allScopes = [ ...currentMissingScopes.missingScopes, ...localScopes ]
  const allColors = {
    ...currentMissingColors.missingColors,
    ...local.colors,
  }
  const jsRules = []
  const missingScopes = foreignScopes.filter(x => {
    if (allScopes.includes(x)) return false
    if (x.endsWith('.js')){
      jsRules.push(x)

      return false
    }

    return true
  })
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
      MISSING_COLORS,
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

  expect(jsRules).toMatchSnapshot()
}
