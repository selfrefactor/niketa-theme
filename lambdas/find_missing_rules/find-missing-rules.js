import { outputJson, readJson } from 'fs-extra'
import { filter } from 'rambdax'

import { readJsonAnt } from '../../src/ants/readJson'

function extractRules(scope){
  if (Array.isArray(scope)) return scope
  if (typeof scope !== 'string') throw new Error('scope must be a string')

  return scope.split(',')
}

function getAllScopes(tokenColors){
  let toReturn = []

  tokenColors.forEach(({ scope }) => {
    const languageRules = extractRules(scope)
    toReturn = [ ...toReturn, ...languageRules ]
  })

  return toReturn
}

const MISSING_SCOPES = `${ __dirname }/missingScopes.json`

export async function findMissingRules(label = 'lukin'){
  const foreign = await readJson(`${ __dirname }/assets/${ label }.json`)
  const local = await readJsonAnt('themes/CommunicationBreakdown.json')
  const currentMissingScopes = await readJsonAnt(MISSING_SCOPES)

  console.log(currentMissingScopes.missingScopes[ 0 ])
  console.log(currentMissingScopes.missingScopes.length)
  
  const foreignScopes = getAllScopes(foreign.tokenColors)
  const localScopes = getAllScopes(local.tokenColors)

  const missingColors = filter((x, prop) => {
    if (local.colors[ prop ]) return false

    return x
  })(foreign.colors)

  const allScopes = [...currentMissingScopes.missingScopes, ...localScopes]

  const missingScopes = foreignScopes.filter(x => !allScopes.includes(x))
  
  console.log(localScopes.length)
  console.log(foreignScopes.length)
  console.log(missingScopes.length)
  console.log(Object.keys(local.colors).length)
  console.log(Object.keys(foreign.colors).length)
  console.log(Object.keys(missingColors).length)
  
  await outputJson(
    `${ __dirname }/missingColors.json`,
    { missingColors },
    { spaces : 2 }
  )
  
  if(missingScopes.length === 0) return
  
  await outputJson(
    MISSING_SCOPES, { missingScopes: [...currentMissingScopes.missingScopes, ...missingScopes] }, { spaces : 2 }
  )

  expect({
    missingScopes,
    missingColors,
  }).toMatchSnapshot()
}
