import { pascalCase } from 'string-fn'
import { readJsonAnt } from '../ants/readJson'
import { writeJsonAnt } from '../ants/writeJson'

export function publishTheme(source, label, base){
  const name = pascalCase(`${ base }.${ label }`)
  const theme = readJsonAnt(source)
  writeJsonAnt(`./themes/${ name }.json`, theme)

  return name
}
