import { readJsonAnt } from '../readJson'
import { constantCase } from 'string-fn'

export function translate(colorKeyRaw){
  const colors = readJsonAnt('colors.json')

  const colorKey = constantCase(colorKeyRaw)
  const [ num ] = [ ...colorKeyRaw ].filter(x => Number(x) === Number(x))

  const actualColor = colors[ colorKey ][ String(num) ]

  return actualColor
}