import { readJsonAnt } from '../readJson'
import { constantCase } from 'string-fn'
import { dropLast } from 'rambdax'

export function translate(colorKeyRaw, extraMode = false){
  try {
    const colors = readJsonAnt('colors.json')

    const colorKey = constantCase(colorKeyRaw)
    const [ num ] = [ ...colorKeyRaw ].filter(x => Number(x) === Number(x))

    const actualColor = colors[ colorKey ][ String(num) ]

    return extraMode ? dropLast(2, actualColor) : actualColor
  } catch (e){
    console.log(e)
    throw new Error(`TRANSLATE_CATCH ${ colorKeyRaw }`)
  }
}

export function translateOpacity(colorKey){

  return translate(colorKey, true)
}
