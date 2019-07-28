import { filter, complement } from 'rambdax'
import { trendingColorsAnt, isTooLight } from './trendingColors'

test('happy', async () => {
  jest.setTimeout(10 * 60 * 1000)
  // const FORBIDDEN = []
  const FORBIDDEN = [ '#8bc3c7', '#B6A3CB', '#22049F', '#043BA2', '#0418C1', '#f38b80' ]
  const predicate = x => {
    const passForbidden = filter(a => FORBIDDEN.includes(a), x.COLORS)
    if (Object.keys(passForbidden).length > 0) return false
    if (x.minBetween < 1.8) return false
    const numLights = filter(isTooLight, x.COLORS)

    return Object.keys(numLights).length === 0
  }
  await trendingColorsAnt({
    useLocalColors : false,
    reload         : true,
    mixFlag        : true,
    predicate      : filter(predicate),
  })
  // expect().toBe()
})
