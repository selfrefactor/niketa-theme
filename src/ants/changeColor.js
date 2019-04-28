import Color from 'color'
import { toHex } from './applyDistance'
import { switcher, takeLast, dropLast } from 'rambdax'

const ConvertBase = function(num){
  return {
    from : function(baseFrom){
      return {
        to : function(baseTo){
          return parseInt(num, baseFrom).toString(baseTo)
        },
      }
    },
  }
}

export function hexToNumber(hex){
  return Number(ConvertBase(hex).from(16)
    .to(10))
}

function whenOpacity({ color, opacityChange, opacityDirection }){
  const lastTwo = takeLast(2, color)
  const asNumber = hexToNumber(lastTwo)

  const withCorrection = opacityDirection === 'plus' ?
    asNumber + opacityChange :
    asNumber - opacityChange

  const newOpacity = withCorrection > 240 ?
    'f3' :
    toHex(withCorrection)

  const toReturn = `${ dropLast(2, color) }${ newOpacity }`

  return toReturn
}

function whenNoOpacity({ color, change, mode }){

  return Color(color)[ mode ](change)
    .hex()
}

const BASE = 0.08

export function changeColorAnt(color, modeInput, base = BASE){
  const { mode, change, opacityChange, opacityDirection } = switcher(modeInput)
    .is('DARKEST', {
      mode             : 'darken',
      change           : base * 3,
      opacityChange    : 90,
      opacityDirection : 'plus',
    })
    .is('DARKER', {
      mode             : 'darken',
      change           : base * 2,
      opacityChange    : 60,
      opacityDirection : 'plus',
    })
    .is('DARK', {
      mode             : 'darken',
      change           : base,
      opacityChange    : 40,
      opacityDirection : 'plus',
    })
    .is('LIGHTEST', {
      mode             : 'lighten',
      change           : base * 3,
      opacityChange    : 70,
      opacityDirection : 'minus',
    })
    .is('LIGHTER', {
      mode             : 'lighten',
      change           : base * 2,
      opacityChange    : 50,
      opacityDirection : 'minus',
    })
    .is('LIGHT', {
      mode             : 'lighten',
      change           : base,
      opacityChange    : 30,
      opacityDirection : 'minus',
    })
    .default({})

  if (!mode) return color

  const hasOpacity = color.length === 9

  const toReturn = hasOpacity ?
    whenOpacity({
      color,
      opacityChange,
      opacityDirection,
    }) :
    whenNoOpacity({
      color,
      change,
      mode,
    })

  return toReturn
}
