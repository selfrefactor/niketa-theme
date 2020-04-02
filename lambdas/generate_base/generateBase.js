import { outputFileSync } from 'fs-extra'
import { resolve } from 'path'
import { random, remove, replace, switcher } from 'rambdax'

import * as basePalette from '../../palettes/base'

const UNDERLINE = '.UNDERLINE'
const extensions = [ '.jsx', '.ts', '.tsx' ]

function save({ label, data }){
  const output = resolve(__dirname, `../../palettes/${ label }.json`)
  outputFileSync(output, JSON.stringify(
    data, null, 2
  ))
}

export function randomShade(color){
  const seed = random(3, 20)

  const shade = switcher(seed)
    .is(20, `${ color }_LIGHTEST`)
    .is(19, `${ color }_LIGHTER`)
    .is(17, `${ color }_LIGHT`)
    .is(16, `${ color }_LIGHT`)
    .is(15, `${ color }_DARK`)
    .is(14, `${ color }_DARK`)
    .is(18, `${ color }_DARK`)
    .is(12, `${ color }_DARKER`)
    .is(11, `${ color }_DARKEST`)
    .default(color)

  return shade
}

function pushToTokenColors({ syntaxInstance, underline, tokenColors, color }){
  const tokenColor = {
    name     : syntaxInstance,
    scope    : syntaxInstance,
    settings : {
      ...underline,
      foreground : randomShade(color),
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
          foreground : randomShade(color),
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
