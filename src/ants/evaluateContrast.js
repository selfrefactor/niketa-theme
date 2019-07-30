import { readJsonAnt } from '../ants/readJson'
import { pascalCase } from 'string-fn'
const getContrastRatio = require('get-contrast-ratio')
import { SETTINGS } from '../createMultipleTheme.spec'
import { map, filter , values , findInObject } from 'rambdax'

export function evaluateContrast(){
  const hash = {}
  let max = -Infinity
  let min = Infinity
  const toLog = []
  map(singleSetting => {
    const colors = filter(
      (_, prop) => prop.startsWith('COLOR') && prop.length === 7
    )(singleSetting)
    const theme = pascalCase(`${ singleSetting.mode }.${ singleSetting.label }`)

    const content = readJsonAnt(`themes/${ theme }.json`)
    const background = content.colors[ 'editor.background' ]
    const sk = map(
      (singleColor, prop) => {
        const love = getContrastRatio.default(background, singleColor)
        if(love < min) min = love
        if(love > max) max = love
        hash[`${theme}.${prop}`] = love
        return love
      } 
    )(colors)  
    const sum = values(sk).reduce(
      (prev, curr) => curr + prev,
      0
    ) 
    const approximate = Math.floor(sum/values(sk).length)  
    toLog.push({theme, approximate})   
  })(SETTINGS)
  const minColor = findInObject(
    x => x === min,
    hash
  )
  const maxColor = findInObject(
    x => x === max,
    hash
  )
  console.log(hash);
  toLog.forEach(x => console.log(x.theme, x.approximate))
  console.log(minColor, maxColor);
}
