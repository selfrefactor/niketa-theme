import Color from 'color'
import { switcher } from 'rambdax'

const BASE = 0.05

export function changeColorAnt(color, modeInput){
  const {mode, change} = switcher(modeInput)
    .is('DARKER', {mode: 'darken', change: BASE*2})
    .is('DARK', {mode: 'darken', change: BASE})
    .is('LIGHTER', {mode: 'lighten', change: BASE*2})
    .is('LIGHT', {mode: 'lighten', change: BASE})
    .default({})

  if(!mode) return color

  return Color(color)[mode](change).hex()
}