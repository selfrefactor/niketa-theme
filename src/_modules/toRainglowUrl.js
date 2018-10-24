import { multiline } from 'rambdax'
const rawHead = 'https://raw.githubusercontent.com/'

export function toRainglowUrl(tag){
  return multiline(`
    https://raw.githubusercontent.com
    rainglow
    vscode
    master
    themes
    ${tag}.json
  `,'/')
}

