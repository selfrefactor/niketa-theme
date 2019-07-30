import { scrapeColors } from './scrapeColors.js'

test('happy', async () => {
  jest.setTimeout(10 * 60 * 1000)

  await scrapeColors()
})
