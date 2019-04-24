import { readJsonAnt } from '../readJson'
import { constantCase } from 'string-fn'
import { dropLast } from 'rambdax'

export function translate(colorKeyRaw, extraMode = false){
  const colors = readJsonAnt('colors.json')

  const colorKey = constantCase(colorKeyRaw)
  const [ num ] = [ ...colorKeyRaw ].filter(x => Number(x) === Number(x))

  const actualColor = colors[ colorKey ][ String(num) ]

  return extraMode ? dropLast(2, actualColor) : actualColor
}

export function translateOpacity(colorKey){

  return translate(colorKey, true)
}
