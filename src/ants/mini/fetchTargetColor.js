import { constantCase } from 'string-fn'
import { readJsonAnt } from '../readJson'

export class FetchTargetColor{
  constructor({ targetIndex, targets, opacityFlag }){
    this.opacityTargets = targets[ 0 ]
    this.targets = targets[ 1 ]
    this.targetIndex = targetIndex
    this.opacityFlag = opacityFlag
  }

  is(zeroOrOne){
    if (this.opacityFlag){
      return this.opacityTargets[ this.targetIndex ][ zeroOrOne ]
    }

    const colors = readJsonAnt('colors.json')
    const [ whenZero, whenOne ] = this.targets[ this.targetIndex ]

    const colorKeyRaw = zeroOrOne === 0 ? whenZero : whenOne

    const colorKey = constantCase(colorKeyRaw)
    const [ num ] = [ ...colorKeyRaw ].filter(x => Number(x) === Number(x))

    const actualColor = colors[ colorKey ][ String(num) ]

    return actualColor
  }
}
