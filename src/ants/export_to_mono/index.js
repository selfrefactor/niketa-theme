import { readJsonAnt } from '../readJson'
import {resolve} from 'path'
import {existsSync} from 'fs'

const THEMES = [
  'advanced.bat',
  'advanced.cat',
  'advanced.dog',
  'advanced.engine',
  'advanced.hook',
  'advanced.mystery',
  'brave.habits',
  'brave.homer',
  'brave.love',
  'brave.neighbour',
  'circus.ajax',
  'circus.brother',
  'circus.people',
  'circus.whisky',
  'niketa.bear',
  'niketa.moon',
  'niketa.owl',
]

export function exportToMono(themeIndex){
  const filePathBase = resolve(
    __dirname,
    '../../../../niketa-themes/packages'
  )

  if(existsSync(filePathBase)) return console.log(`${filePathBase} is not a directory`)


  // console.log({ themeIndex })
}
