import { filter, complement } from 'rambdax'
import { trendingColorsAnt, isTooLight } from './trendingColors'

test('happy', async () => {
  jest.setTimeout(10 * 60 * 1000)
  const FORBIDDEN = []
  // const FORBIDDEN = [ '#6561F5', '#ff8c00' ]
  const predicate = x => {
    const passForbidden = filter(a => FORBIDDEN.includes(a), x.COLORS)
    if (Object.keys(passForbidden).length > 0) return false

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
