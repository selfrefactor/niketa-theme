import { readJsonAnt } from '../readJson'
import { constantCase } from 'string-fn'

export function translate(colorKeyRaw, extraMode = false){
  const colors = readJsonAnt('colors.json')

  const colorKey = constantCase(colorKeyRaw)
  const [ num ] = [ ...colorKeyRaw ].filter(x => Number(x) === Number(x))

  const actualColor = colors[ colorKey ][ String(num) ]

  return extraMode ? `${ actualColor }-` : actualColor
}

export function translatex(colorKeyRaw){
  return translate(colorKeyRaw, true)
}
