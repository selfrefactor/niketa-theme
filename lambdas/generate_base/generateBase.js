import { outputFileSync } from 'fs-extra'
import { resolve } from 'path'
import { remove, replace } from 'rambdax'

import * as basePalette from '../../palettes/base'

const UNDERLINE = '.UNDERLINE'
const extensions = [ '.jsx', '.ts', '.tsx' ]

function save({ label, data }){
  const output = resolve(__dirname, `../../palettes/${ label }.json`)
  outputFileSync(output, JSON.stringify(
    data, null, 2
  ))
}

function pushToTokenColors({ syntaxInstance, underline, tokenColors, color }){
  const tokenColor = {
    name     : syntaxInstance,
    scope    : syntaxInstance,
    settings : {
      ...underline,
      foreground : color,
    },
  }

  tokenColors.push(tokenColor)

  if (syntaxInstance.endsWith('.js')){
    const plainSyntaxInstance = remove('.js', syntaxInstance)

    extensions.forEach(extension => {
      const tokenColorExtension = {
        name     : `${ plainSyntaxInstance }${ extension }`,
        scope    : `${ plainSyntaxInstance }${ extension }`,
        settings : {
          ...underline,
          foreground : color,
        },
      }
      tokenColors.push(tokenColorExtension)
    })
  }
  if (syntaxInstance.endsWith('.begin.js')){
    const endSyntaxInstance = replace(
      '.begin.js', '.end.js', syntaxInstance
    )
    pushToTokenColors({
      syntaxInstance : endSyntaxInstance,
      underline,
      tokenColors,
      color,
    })
  }
}

export function generateBase(label){
  const { baseBase, baseData } = basePalette
  const tokenColors = []

  Object.entries(baseData).forEach(([ color, syntaxInstances ]) => {
    syntaxInstances.forEach(syntaxInstanceRaw => {
      const syntaxInstance = remove(UNDERLINE, syntaxInstanceRaw)

      const underline = syntaxInstanceRaw.endsWith(UNDERLINE) ?
        { fontStyle : 'underline' } :
        {}

      pushToTokenColors({
        syntaxInstance,
        underline,
        color,
        tokenColors,
      })
    })
  })

  const themeBase = {
    ...baseBase,
    tokenColors,
  }

  save({
    label,
    data : themeBase,
  })
}
