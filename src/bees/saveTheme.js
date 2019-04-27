import { writeJsonAnt } from '../ants/writeJson'
import { pascalCase } from 'string-fn'

const BASE = 'baboon'

export const namesHash = [
  'ant',
  'bee',
  'cell',
  'deep',
  'delatour',
  'figure',
  'forreal',
  'glamour',
  'greet',
  'hit',
  'jessy',
  'literal',
  'marketshare',
  'misery',
  'obnoxious',
  'quote',
  'refrain',
  'remains',
  'salome',
  'samara',
  'same',
  'song',
  'star',
  'trauma',
  'vesi',
  'workingman',
  'ziggy',
]

export const MAX_LEVELS = namesHash.length

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
