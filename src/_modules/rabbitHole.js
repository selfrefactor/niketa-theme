import {rainglow, others} from '../data.json'
import { mapAsync, map, headObject } from 'rambdax'
import {toRainglowUrl} from './toRainglowUrl'
import {requestThemeJson} from './requestThemeJson'
import {toRawUrl} from './toRawUrl'
import {pascalCase, dotCase, camelCase} from 'string-fn'
import { writeJsonSync } from 'fs-extra'

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
    // writeJsonSync(filePath, newData)

    return {
      label,
      uiTheme,
      path: filePath 
    }
  })

  return packageJsonData
}

