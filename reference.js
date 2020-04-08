const packageBase = require('./packageBase.json')
const { change, pluck, log, logInit } = require('rambdax')
const { copySync, outputJsonSync, outputFileSync } = require('fs-extra')
const { existsSync } = require('fs')
const { pascalCase, snakeCase, titleCase } = require('string-fn')
const { resolve } = require('path')
logInit({ logFlag : false })

const base = resolve(__dirname, '../../')
const themesFolder = resolve(__dirname, '../themes')
const screensFolder = resolve(__dirname, '../screens')
const packageJsonFile = resolve(__dirname, '../package.json')
const readmeFile = resolve(__dirname, '../README.md')

const THEMES = [ 'ask', 'always', 'together', 'never' ]

const FILE =
  'https://github.com/selfrefactor/niketa-theme/blob/master/src/createPaletteTheme.spec.js'

const readmeEnd = `
## References

- Featured in [Web Tools Weekly](https://mailchi.mp/webtoolsweekly/web-tools-306)
`.trim()

function workingMan(labelRaw){
  const label = `because.${ labelRaw }`
  const pascalName = pascalCase(label)
  const snakeName = snakeCase(label)
  const titleName = titleCase(label)

  const themePath = `${ base }/${ snakeName }/theme/${ pascalName }.json`
  const themeOutput = `${ themesFolder }/${ pascalName }.json`

  const screenPath = `${ base }/${ snakeName }/theme/${ label }.png`
  const screenOutput = `${ screensFolder }/${ label }.png`
  log({
    screenOutput,
    screenPath,
    themePath,
    themeOutput,
  })
  if (!existsSync(themePath)) throw new Error(`themePath - ${ themePath }`)

  copySync(themePath, themeOutput)

  copySync(screenPath, screenOutput)

  const linkLabel = `${ label }.niketa`

  const readmePartial = `
  ### ${ titleName }

![${ label }](https://github.com/selfrefactor/niketa-themes/blob/master/packages/because/screens/${ label }.png?raw=true)

[As a standalone theme](https://marketplace.visualstudio.com/items?itemName=selfrefactor.${ pascalCase(
    linkLabel
  ) })

`.trim()

  return {
    data : {
      label   : pascalName,
      uiTheme : 'vs-dark',
      path    : `./themes/${ pascalName }.json`,
    },
    readmePartial,
  }
}

function build(themesInput = THEMES){
  const readmeBase = `
# Because

${
  themesInput.length
} Dark VSCode Themes build with [Niketa theme generator](${ FILE })

## Screens
`.trim()

  const workingManResult = themesInput.map(workingMan)

  const themes = pluck('data', workingManResult)
  const readmePartials = pluck('readmePartial', workingManResult).join(
    '\n\n'
  )

  const toSave = change(packageBase, 'contributes.themes', themes)

  const readme = `${ readmeBase }\n\n${ readmePartials }\n\n${readmeEnd}`

  outputJsonSync(packageJsonFile, toSave, { spaces : 2 })
  outputFileSync(readmeFile, readme)
}

exports.build = build
