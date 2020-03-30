import { changeColorAnt } from './ants/changeColor'

export function createPaletteRule(
  prop, colorBase, rate = 0.045
){
  const willReturn = {}
  const modes = [ 'DARKEST', 'DARKER', 'LIGHTER', 'LIGHTEST', 'DARK', 'LIGHT' ]
  modes.forEach(mode => {
    const newColor = changeColorAnt(
      colorBase, mode, rate
    )

    willReturn[ `${ prop }_${ mode }` ] = newColor
  })

  willReturn[ prop ] = colorBase

  return willReturn
}
