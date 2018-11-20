import { multiline } from 'rambdax'
const rawHead = 'https://raw.githubusercontent.com/'

export function toBase16Url(tag){
  return multiline(`
    https://raw.githubusercontent.com
    riesinger
    base16-vscode
    master
    themes
    ${tag}.json
  `,'/')
}

