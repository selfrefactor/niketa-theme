import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { camelCase } from 'string-fn'
import { baseData, baseBase } from '../palettes/baseData'

import { switcher, random, remove } from 'rambdax'
import { changeColorAnt } from './ants/changeColor'
import { listImportedColorsAnt } from './ants/listImportedColors'
import { readFileSync } from 'fs-extra'
import { publishThemeBee } from './bees/publishTheme'
import { savePaletteThemeBee } from './bees/saveTheme'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { getGradientBee } from './bees/getGradient'

const UNDERLINE = '.UNDERLINE'

function saveAnt(label, data){
  const output = resolve(
    __dirname,
    `../palettes/generated/${ camelCase(label) }.json`
  )
  writeFileSync(output, JSON.stringify(data, null, 2))
}

export function randomShade(color){
  const seed = random(3, 10)

  const shade = switcher(seed)
    .is(10, `${ color }_DARKER`)
    .is(9, `${ color }_DARK`)
    .is(8, `${ color }_LIGHTER`)
    .is(7, `${ color }_LIGHT`)
    .default(color)

  return shade
}

export function baseRandom(label){
  return label

}

export function base(label){
  const tokenColors = []

  Object.entries(baseData)
    .forEach(([ color, syntaxInstances ]) => {

      syntaxInstances
        .forEach(syntaxInstanceRaw => {
          const underline = syntaxInstanceRaw.endsWith(UNDERLINE) ?
            {"fontStyle": "underline"} :
            {}
          const syntaxInstance = remove(UNDERLINE, syntaxInstanceRaw)
          
          const tokenColor = {
            "name": syntaxInstance,
            "scope": syntaxInstance,
            "settings": {
              ...underline,
              "foreground": randomShade(color)
            }
          }
          tokenColors.push(tokenColor)  
        })
    })

  const themeBase = {
    ...baseBase,
    tokenColors
  }
  saveAnt(label, themeBase)
}

