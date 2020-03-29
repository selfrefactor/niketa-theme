import { writeJsonAnt } from './writeJson'
import { readJsonAnt } from './readJson'

export function saveToPackageJsonAnt(partialJson){
  const packageJson = readJsonAnt(
    'package.json'
  )
  const newPackageJson = {
    ...packageJson,
    contributes : { themes : partialJson },
  }
  writeJsonAnt('package.json', newPackageJson)
}
