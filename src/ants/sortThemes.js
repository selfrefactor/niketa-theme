import hexSorter from 'hexsorter'
import { readJsonAnt } from './readJson'
import exported from '../../exported.json'

export function sortThemesAnt(){
  const mapped = exported.map(({ label }) => {

    try {
      const { colors } = readJsonAnt(`themes/${ label }.json`)
      const background = colors[ 'editor.background' ]

      return {
        background,
        label,
      }
    } catch (error){
      console.log({ error : label })

      return false
    }
  })
  const filtered = mapped.filter(Boolean)

  filtered.sort((first, second) => {
    const brighter = hexSorter.mostBrightColor(
      [ first.background, second.background ]
    )

    return brighter === first.background ? -1 : 1
  })

  return filtered
}
