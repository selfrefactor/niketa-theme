import {rainglow, others} from '../data.json'
import { mapAsync, change } from 'rambdax'
import {toRainglowUrl} from './toRainglowUrl'
import {requestThemeJson} from './requestThemeJson'
import {toRawUrl} from './toRawUrl'
import {pascalCase, dotCase, camelCase} from 'string-fn'
import { writeJsonSync, readJsonSync } from 'fs-extra'

const LOCATION = `${process.cwd()}/package.json`
const NIKETA = 'Niketa'

export async function rabbitHole (){
  const rainglowList = await mapAsync(
    async x=> {
      const data = await requestThemeJson(
        toRainglowUrl(x)
      )
      
      return {
        data,
        name: dotCase(x),
      }
    }
  )(rainglow)

  const othersList = await mapAsync(
    async ([name, url]) => {
      const data = await requestThemeJson(
        toRawUrl(url)
      )

      return {
        data,
        name: dotCase(name)
      }
    }
  )(Object.entries(others))

  const list = [...rainglowList, ...othersList]
  
  const packageJsonData = list.map(x => {
    const uiTheme = x.data.type === 'light' ?
      'vs' :
      'vs-dark'

    const label = pascalCase(`${NIKETA}.${x.name}`)

    const newData = {
      ...x.data,
      name: label
    }
    const fileName = camelCase(x.name)
    const filePath = `./imported/${fileName}.json`
    writeJsonSync(
      filePath, 
      newData, 
      {spaces: 2}
    )
    return {
      label,
      uiTheme,
      path: filePath 
    }
  })

  const packageJson = readJsonSync(LOCATION)

  const themes = [
    ...getNiketaData(),
    ...packageJsonData
  ]

  const newPackageJson = change(
    packageJson,
    'contributes', 
    {themes}
  )

  writeJsonSync(
    LOCATION,
    newPackageJson,
    {spaces: 2}
  )

  return newPackageJson.contributes.themes
}

function getNiketaData(){
  return [
    {
      "label": "NiketaLight",
      "uiTheme": "vs",
      "path": "./themes/niketa-light.json"
    },
    {
      "label": "NiketaYellow",
      "uiTheme": "vs",
      "path": "./themes/niketa-yellow.json"
    },
    {
      "label": "NiketaDark",
      "uiTheme": "vs-dark",
      "path": "./themes/niketa-dark.json"
    }
  ]
}