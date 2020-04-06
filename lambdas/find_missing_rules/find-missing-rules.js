import { readJson } from 'fs-extra'

import { readJsonAnt } from '../../src/ants/readJson'

export async function findMissingRules(){
  const a = await readJson(`${ __dirname }/assets/lukin.json`)
  const aa = await readJsonAnt('themes/CommunicationBreakdown.json')
  console.log(aa)
  // const a = await readJsonAnt('lambdas/find_missing_rules/')
}
