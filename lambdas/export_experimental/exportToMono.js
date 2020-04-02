import { existsSync, readFileSync } from 'fs'
import { copy, copySync, outputFileSync } from 'fs-extra'
import { exec } from 'helpers-fn'
import { resolve as resolveMethod } from 'path'
import { replace, sort } from 'rambdax'
import { dotCase, snakeCase, titleCase } from 'string-fn'

export async function exportToMono(){
  const filePathBase = resolveMethod(__dirname,
    '../../../niketa-themes/packages')
  const source = resolveMethod(__dirname, '../../')

  if (!existsSync(filePathBase)){
    return console.log(`${ filePathBase } is not a directory`)
  }

  await exec({
    command : 'rm -rf niketa-theme-experimental',
    cwd     : filePathBase,
  })
  const destination = `${ filePathBase }/niketa-theme-experimental`

  await copy(source, destination)
  await exec({
    command : 'rm -rf .git',
    cwd     : destination,
  })
  await exec({
    command : 'vsce publish minor',
    cwd     : destination,
  })
  await exec({
    command : 'run d feat@bump experimental',
    cwd     : destination,
  })  
}

function performRename(
  content, newName, oldName, skipDotCase = false
){
  const afterDot = replace(
    new RegExp(dotCase(oldName), 'g'),
    dotCase(newName),
    content
  )

  const afterSnake = replace(
    new RegExp(snakeCase(oldName), 'g'),
    snakeCase(newName),
    skipDotCase ? content : afterDot
  )
  const afterTitle = replace(
    new RegExp(titleCase(oldName), 'g'),
    titleCase(newName),
    afterSnake
  )

  return replace(
    new RegExp(oldName, 'g'), newName, afterTitle
  )
}

async function republish({
  republishFolder,
  republishPackageJson,
  source,
  themeName,
  republishAs,
}){
  if (existsSync(republishFolder)){
    return console.log('Please empty destination folder', republishAs)
  }
  copySync(source, republishFolder)

  const readme = readFileSync(`${ source }/README.md`).toString()
  const editedReadme = performRename(
    readme, republishAs, themeName, true
  )
  outputFileSync(`${ republishFolder }/README.md`, editedReadme)

  const packageJson = readFileSync(republishPackageJson).toString()
  const editedPackageJson = performRename(
    packageJson,
    republishAs,
    themeName,
    true
  )
  outputFileSync(republishPackageJson, editedPackageJson)

  await exec({
    command : `run d feat@publish ${ dotCase(republishAs) }`,
    cwd     : republishFolder,
  })
  await exec({
    command : 'vsce publish',
    cwd     : republishFolder,
  })
  await exec({
    command : 'run d small',
    cwd     : republishFolder,
  })
}
