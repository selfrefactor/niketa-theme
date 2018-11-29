import { glue } from 'rambdax'
import { pascalCase } from 'string-fn'

export function toBase2Url(tag) {
  return glue(
    `
    https://raw.githubusercontent.com
    atelierbram
    Base2Tone-VSCode-Themes
    master
    themes
    Base2Tone_${ pascalCase(tag) }-color-theme.json
  `,
    '/'
  )
}
