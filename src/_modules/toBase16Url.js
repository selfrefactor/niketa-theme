import { glue } from 'rambdax'

export function toBase16Url(tag){
  return glue(`
    https://raw.githubusercontent.com
    riesinger
    base16-vscode
    master
    themes
    ${tag}.json
  `,'/')
}

