import { exportToMono, getLastestScreen } from './exportToMono'

/*
  Use it to create a new trending theme
  Take a screen of the about-to-be deprecated theme
  Run `await exportToMono('BraveLove', true, 'LemonSong')`

  this updates brave.love mono repo and creates a new theme

  Second scenario is when updating a thrending theme,
   but you don't want to create a new theme,
   just update trending theme mono repo

   Run `await exportToMono('BraveLove', true')` for screen update or run `await exportToMono('BraveLove')` for style update only

  Third scenario is when you have changed any other theme and you need monorepo to be synced with.
  Optionally, you can also publish it as a new theme
*/
test('happy', async () => {
  jest.setTimeout(2 * 60 * 1000)
  // await exportToMono('AdvancedHook', true, 'TeaForOne')
  // await exportToMono('NiketaMoon', true, 'DancingDays')
  // await exportToMono('AdvancedBat')
  // await exportToMono('AdvancedHook', true)

  // 1.1.1 Publish new trending theme
  // ============================================
  // await exportToMono('BraveLove', true, 'MobyDick')

  // 1.2.1 Republish CircusAjax as a new theme
  // before going forward to change the theme
  // ============================================
  // await exportToMono('CircusAjax', false, 'GretaVanFleet')
  // await exportToMono('AdvancedHook', false, 'Brickleberry')

  // // 1.2.2 Update the theme
  // // ============================================
  // await exportToMono('AdvancedHook', true)
  await exportToMono('CircusAjax', true)
})

test.skip('latest screen', async () => {
  await getLastestScreen()
})
