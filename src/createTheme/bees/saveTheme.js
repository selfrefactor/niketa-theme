import { writeJsonAnt } from '../ants/writeJson'
import { titleCase } from 'string-fn'

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
  const label = titleCase(`${ BASE }.${ namesHash[ i ] }`)
  writeJsonAnt(
    `./baboon/${ label }.json`,
    theme
  )

  return label
}
