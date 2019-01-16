import { writeJsonAnt } from '../ants/writeJson'
import { pascalCase } from 'string-fn'

const BASE = 'baboon'

export const namesHash = [
  'ant',
  'bee',
  'cell',
  'deep',
  'figure',
  'glamour',
  'hit',
  'jessy',
  'quote',
  'vesi',
  'trauma',
  'salome',
]

export function saveThemeBee(theme, i){
  const label = pascalCase(`${ BASE }.${ namesHash[ i ] }`)
  theme.name = label
  writeJsonAnt(
    `./baboon/${ label }.json`,
    theme
  )

  return label
}

export function savePaletteThemeBee(themeString, i){
  const label = pascalCase(`${ BASE }.${ namesHash[ i ] }`)
  const theme = JSON.parse(themeString)  
  theme.name = label
  writeJsonAnt(
    `./baboon/${ label }.json`,
    theme
  )

  return label
}
