import { readFileSync } from 'fs'
import { copy, outputFile, outputJson, readJson } from 'fs-extra'
import { exec } from 'helpers-fn'
import { resolve as resolveMethod } from 'path'
import { piped, replace } from 'rambdax'
import { dotCase, pascalCase, snakeCase } from 'string-fn'

const PROJECT_ROOT = resolveMethod(__dirname, '../../')

function createReadme({ themeName, asDot, asSnake }){
  const templateData = readFileSync(`${ __dirname }/template/README.md`).toString()

  return piped(
    templateData,
    replace(/FooBar/g, themeName),
    replace(/foo\.bar/g, asDot),
    replace(/foo_bar/g, asSnake)
  )
}

async function getPackageJson({ version, themeName, asDot }){
  const content = await readJson(`${ __dirname }/template/package.json`)
  const contributes = {
    themes : [
      {
        label   : themeName,
        uiTheme : 'vs',
        path    : `./theme/${ themeName }.json`,
      },
    ],
  }

  return {
    ...content,
    name        : themeName,
    displayName : themeName,
    version,
    icon        : replace(
      'foo.bar', asDot, content.icon
    ),
    contributes,
  }
}

export async function exportToMono(themeNameRaw, version){
  const themeName = pascalCase(themeNameRaw)
  const asDot = dotCase(themeName)
  const asSnake = snakeCase(themeName)
  const readmeContent = createReadme({
    themeName,
    asDot,
    asSnake,
  })
  const packageJsonContent = await getPackageJson({
    version,
    themeName,
    asDot,
  })
  const filePathBase = resolveMethod(__dirname,
    '../../../niketa-themes/packages')

  const DESTINATION_ROOT = `${ filePathBase }/${ asSnake }`

  const themeSource = `${ PROJECT_ROOT }/themes/${ themeName }.json`
  const screenSource = `${ PROJECT_ROOT }/files/${ asDot }.png`

  const themeDestination = `${ DESTINATION_ROOT }/theme/${ themeName }.json`
  const screenDestination = `${ DESTINATION_ROOT }/theme/${ asDot }.png`
  const readmeDestination = `${ DESTINATION_ROOT }/README.md`
  const packageJsonDestination = `${ DESTINATION_ROOT }/package.json`

  await copy(
    screenSource, screenDestination, { overwrite : true }
  )
  await copy(
    themeSource, themeDestination, { overwrite : true }
  )
  await outputFile(readmeDestination, readmeContent)
  await outputJson(
    packageJsonDestination, packageJsonContent, { spaces : 2 }
  )

  await exec({
    command : 'run d feat@bump patch',
    cwd     : DESTINATION_ROOT,
  })
  await exec({
    command : 'vsce publish patch',
    cwd     : DESTINATION_ROOT,
  })
  await exec({
    command : 'run d chore@bump',
    cwd     : DESTINATION_ROOT,
  })
}
