import Color from 'color'
import { switcher, takeLast } from 'rambdax'

const BASE = 0.08

const whenOpacity = (toReturn, color) => `${ toReturn }${ takeLast(2, color) }`

export function changeColorAnt(color, modeInput, base = BASE){

  const { mode, change } = switcher(modeInput)
    .is('DARKEST', {
      mode   : 'darken',
      change : base * 3,
    })
    .is('DARKER', {
      mode   : 'darken',
      change : base * 2,
    })
    .is('DARK', {
      mode   : 'darken',
      change : base,
    })
    .is('LIGHTER', {
      mode   : 'lighten',
      change : base * 2,
    })
    .is('LIGHT', {
      mode   : 'lighten',
      change : base,
    })
    .default({})

  if (!mode) return color

  const hasOpacity = color.length === 9
  const toReturn = Color(color)[ mode ](change)
    .hex()

  return hasOpacity ?
    whenOpacity(toReturn, color) :
    toReturn
}
