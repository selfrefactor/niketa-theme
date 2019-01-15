import Color from 'color'
import { switcher } from 'rambdax'

export function changeColorAnt(color, modeInput){
  const {mode, change} = switcher(modeInput)
    .is('DARKER', {mode: 'darken', change: 0.4})
    .is('DARK', {mode: 'darken', change: 0.2})
    .is('LIGHTER', {mode: 'lighten', change: 0.4})
    .is('LIGHT', {mode: 'lighten', change: 0.2})
    .default({})

  if(!mode) return color

  return Color(color)[mode](change).hex()
}