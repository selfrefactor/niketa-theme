import { writeJsonAnt } from '../ants/writeJson'
import { titleCase } from 'string-fn'

const namesHash = [
  'baboon',
  'bear',
  'bee',
  'bull',
  'butterfly',
  'cell',
  'deep',
]

export function saveThemeBee(theme, i){
  const label = titleCase(namesHash[ i ])
  writeJsonAnt(
    `./src/createTheme/output/${ label }.json`,
    theme
  )

  return label
}
