import { writeJsonAnt } from '../ants/writeJson'
import { pascalCase } from 'string-fn'

const BASE = 'baboon'

const namesHash = [
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
  writeJsonAnt(
    `./baboon/${ label }.json`,
    theme
  )

  return label
}
