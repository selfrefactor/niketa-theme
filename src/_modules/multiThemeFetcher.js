/**
 * The line below means that 
 * Insiders must have `multitheme` installed
 */
const LOCATION = `/home/s/.vscode-insiders/extensions/arturoarevalo.multi-theme-0.0.2/themes`


import { multi, multiLight } from '../data.json'
import { copyFileSync } from 'fs'
import { resolve } from 'path'
import { pascalCase, kebabCase } from 'string-fn'

const OUTPUT = resolve(__dirname, '../themes')

export function multiThemeFetcher(){
  const list = multi.map(
    name => {
      const output = `${kebabCase(name)}.tmTheme`
      copyFileSync(
        `${LOCATION}/${name}.tmTheme`,
        `${OUTPUT}/${output}`
      )
      const uiTheme = multiLight.includes(name) ?
        'vs':
        'vs-dark'

      return {
        label   : `Niketa${pascalCase(name)}`,
        uiTheme,
        path    : `./themes/${output}`,
      }
    }
  )

  return list
}
