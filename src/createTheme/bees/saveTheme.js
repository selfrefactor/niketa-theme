import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { titleCase } from 'string-fn';

const namesHash = [
  'baboon',
  'bear',
  'bee',
  'bull',
  'butterfly',
  'cell',
  'deep',
]

export function saveThemeBee(theme,i){
  const output = resolve(
    __dirname,
    `../output/${titleCase(namesHash[i])}`
  )
  writeFileSync(
    output,
    JSON.stringify(theme)
  )
}