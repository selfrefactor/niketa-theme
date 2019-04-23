import Color from 'color'
import { switcher } from 'rambdax'

const BASE = 0.08

export function changeColorAnt(color, modeInput, base = BASE){
  if(color.length === 9) return color
  
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

  return Color(color)[ mode ](change)
    .hex()
}
