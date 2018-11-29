import { glue } from 'rambdax'

export function toRainglowUrl(tag){
  return glue(`
    https://raw.githubusercontent.com
    rainglow
    vscode
    master
    themes
    ${ tag }.json
  `, '/')
}

