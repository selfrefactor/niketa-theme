import hexSorter from 'hexsorter'
import { readJsonAnt } from './readJson'
import exported from '../../exported.json'
import { pluck } from 'rambdax'

export function sortThemesAnt(){
  const plucked = pluck('label', exported)

  const mapped = exported.map(({ label }) => {
    console.log({ label })

    const { colors } = readJsonAnt(`themes/${ label }.json`)
    const background = colors[ 'editor.background' ]
    console.log({ background })

    return {
      background,
      label,
    }
  })

  mapped.sort((first, second) => {
    const brighter = hexSorter.mostBrightColor(
      [ first.background, second.background ]
    )

    return brighter === first.background ? -1 : 1
  })

  return mapped
}
