import { pluck } from 'rambdax'
import { pascalCase } from 'string-fn'
import { readJsonAnt } from '../ants/readJson'
import { writeJsonAnt } from '../ants/writeJson'

export function publishTheme({ index, name }){
  const tempName = pascalCase(`baboon.${ namesHash[ index ] }`)
  console.log('publish',tempName)
  const theme = readJsonAnt(
    `./baboon/${ tempName }.json`
  )
  const exported = readJsonAnt(
    'exported.json'
  )
  const themeName = pascalCase(name)
  const themePath = `./themes/${ themeName }.json`

  if (
    !pluck('label', exported).includes(themeName)
  ){
    exported.push({
      label   : themeName,
      uiTheme : 'vs',
      path    : themePath,
    })
  }

  writeJsonAnt(
    'exported.json',
    exported
  )
  saveToPackageJson(exported)

  theme.name = themeName
  writeJsonAnt(
    themePath,
    theme
  )
}