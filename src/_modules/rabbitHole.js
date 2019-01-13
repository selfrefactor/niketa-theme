import { mapAsync, change } from 'rambdax'
import { multiThemeFetcher } from './multiThemeFetcher'
import { pascalCase, dotCase, camelCase } from 'string-fn'
import { rainglow, others, base16, base2 } from '../data.json'
import { requestThemeJson } from './requestThemeJson'
import { toBase16Url } from './toBase16Url'
import { toBase2Url } from './toBase2Url'
import { toRainglowUrl } from './toRainglowUrl'
import { toRawUrl } from './toRawUrl'
import { writeJsonSync, readJsonSync } from 'fs-extra'

const LOCATION = `${ process.cwd() }/package.json`

export async function rabbitHole(dev = true){
  const packageJson = readJsonSync(LOCATION)
  
  const themes = [
    ...getNiketaData(),
    ...packageJsonData,
    ...multiThemeFetcher(),
  ]

  const newPackageJson = change(packageJson, 'contributes', { themes })

  writeJsonSync(LOCATION, newPackageJson, { spaces : 2 })

  return newPackageJson.contributes.themes
}

function getNiketaData(){
  return [
    {
      label   : 'CircusLove',
      uiTheme : 'vs',
      path    : './themes/CircusLove.json',
    },
    {
      label   : 'CircusMine',
      uiTheme : 'vs',
      path    : './themes/CircusMine.json',
    }
  ]
}


