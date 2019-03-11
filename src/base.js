import { resolve } from 'path'
import { outputFileSync } from 'fs-extra'

import { camelCase } from 'string-fn'
import { baseData, baseBase, all } from '../palettes/baseData'

import { switcher, random, remove } from 'rambdax'

const UNDERLINE = '.UNDERLINE'
const extensions = [ '.jsx', '.ts', '.tsx' ]
function saveAnt(label, data){
  const output = resolve(
    __dirname,
    `../palettes/generated/${ camelCase(label) }.json`
  )
  outputFileSync(output, JSON.stringify(data, null, 2))
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

export function randomColor(){
  const indexSeed = random(1, 100)

  const index = switcher(indexSeed)
    .is(x => x > 78, '1')
    .is(x => x > 54, '2')
    .is(x => x > 34, '3')
    .is(x => x > 18, '4')
    .default('5')

  return `COLOR_${ index }`
}

export function randomUnderline(){
  return random(1, 100) > 88 ?
    { fontStyle : 'underline' } :
    {}
}

export function baseRandom(label){
  const tokenColors = []

  all.forEach(syntaxInstanceRaw => {
    const underline = syntaxInstanceRaw.endsWith(UNDERLINE) ?
      { fontStyle : 'underline' } :
      {}
    const syntaxInstance = remove(UNDERLINE, syntaxInstanceRaw)
    const color = randomColor()
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
  })

  const themeBase = {
    ...baseBase,
    tokenColors,
  }
  saveAnt(`random.${ label }`, themeBase)
}

export function base(label){
  const tokenColors = []

  Object.entries(baseData)
    .forEach(([ color, syntaxInstances ]) => {

      syntaxInstances
        .forEach(syntaxInstanceRaw => {
          const underline = syntaxInstanceRaw.endsWith(UNDERLINE) ?
            { fontStyle : 'underline' } :
            {}
          const syntaxInstance = remove(UNDERLINE, syntaxInstanceRaw)

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
        })
    })

  const themeBase = {
    ...baseBase,
    tokenColors,
  }
  saveAnt(label, themeBase)
}

