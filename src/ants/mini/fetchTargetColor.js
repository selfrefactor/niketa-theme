export class FetchTargetColor{
  constructor({ targetIndex, targets }){
    this.targets = targets
    this.targetIndex = targetIndex
  }

  isSimple(zeroOrOne){
    return this.targets[ this.targetIndex ][ zeroOrOne ]
  }

  is(zeroOrOne){
    const raw = this.isSimple(zeroOrOne)

    return raw
  }
}
