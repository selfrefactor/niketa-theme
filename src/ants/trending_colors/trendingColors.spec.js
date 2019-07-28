import { trendingColorsAnt } from './trendingColors'

test('happy', async () => {
  jest.setTimeout(10 * 60 * 1000)
  await trendingColorsAnt({
    useLocalColors : false,
    reload         : true,
  })
  // expect().toBe()
})
