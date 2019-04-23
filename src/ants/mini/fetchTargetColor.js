import { constantCase } from 'string-fn'
import { readJsonAnt } from '../readJson'

export class FetchTargetColor{
  constructor({ targetIndex, targets }){
    this.targets = targets
    this.targetIndex = targetIndex
  }

  isSimple(zeroOrOne){
    return this.targets[ this.targetIndex ][ zeroOrOne ]
  }

  is(zeroOrOne){
    const colors = readJsonAnt('colors.json')
    const [ whenZero, whenOne ] = this.targets[ this.targetIndex ]

    const colorKeyRaw = zeroOrOne === 0 ? whenZero : whenOne

    const colorKey = constantCase(colorKeyRaw)
    const [ num ] = [ ...colorKeyRaw ].filter(x => Number(x) === Number(x))

    const actualColor = colors[ colorKey ][ String(num) ]

    return actualColor
  }
}
