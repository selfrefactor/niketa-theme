const { delay, mapAsync, range, flatten } = require('rambdax')
const { initPuppeteer, attach } = require('init-puppeteer')
const { outputFileSync } = require('fs-extra')

const URL = 'https://colorhunt.co/palettes/trendy'
const SELECTOR = 'div[class="item block shadow"]'

void async function scrapeColors(){
  try {
    console.log('start')
    var { browser, page } = await initPuppeteer({
      headless : false,
      logFlag  : false,
      url      : URL,
    })

    const _ = attach(page, `${ process.cwd() }/files/scrapeScreens`)

    await mapAsync(
      async () => {
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        await delay(2000)
      }
    )(range(1, 10))
    const rawResult = await _.$$(SELECTOR, els => els.map(el => el.textContent
      .split('\n')
      .filter(x => x.startsWith('#'))))
    const result = flatten(rawResult.filter(Boolean))

    outputFileSync(
      `${ __dirname }/colors.json`,
      JSON.stringify(result, null, 2)
    )

    await browser.close()
  } catch (e){
    console.log(e)
    await browser.close()
  }
}()
