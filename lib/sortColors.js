export function sortColors(a, b){
  if (a.minBetween === b.minBetween){
    return a.maxBetween > b.maxBetween ? -1 : 1
  }

  return a.minBetween > b.minBetween ? -1 : 1
}
