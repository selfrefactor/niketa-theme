import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { pluck } from 'rambdax'
import { pascalCase } from 'string-fn'

import { readJsonAnt } from '../ants/readJson'
import { saveToPackageJsonAnt } from '../ants/saveToPackageJson'
import { writeJsonAnt } from '../ants/writeJson'
import { namesHash } from './saveTheme'

function keepStateAnt(themeName){
  const source = readFileSync(resolve(__dirname, '../createPaletteTheme.spec.js')).toString()
  const destination = resolve(__dirname,
    `../../files/states/${ themeName }.js`)
  writeFileSync(destination, source)
}

export function publishThemeBee(name, index){
  const tempName = pascalCase(`baboon.${ namesHash[ index ] }`)
  console.log('publish', tempName)
  const theme = readJsonAnt(`./baboon/${ tempName }.json`)
  const exported = readJsonAnt('exported.json')
  const themeName = pascalCase(name)
  const themePath = `./themes/${ themeName }.json`
  keepStateAnt(themeName)

  if (!pluck('label', exported).includes(themeName)){
    exported.push({
      label   : themeName,
      uiTheme : 'vs',
      path    : themePath,
    })
  }

  writeJsonAnt('exported.json', exported)
  saveToPackageJsonAnt(exported)

  theme.name = themeName
  writeJsonAnt(themePath, theme)
}
