import { multiline } from 'rambdax'
import { kebabCase } from "string-fn";
const rawHead = 'https://raw.githubusercontent.com/'

export function toRainglowUrl(tag){
  return multiline(`
    https://raw.githubusercontent.com
    rainglow
    vscode
    master
    themes
    ${kebabCase(tag)}.json
  `,'/')
}

