import { exportToMono, getLastestScreen } from './'

/*
  Use it to create a new trending theme
  Take a screen of the about-to-be deprecated theme
  Run `await exportToMono('BraveLove', true, 'LemonSong')`

  this updates brave.love mono repo and creates a new theme

  Second scenario is when updating a thrending theme,
   but you don't want to create a new theme,
   just update trending theme mono repo

   Run `await exportToMono('BraveLove', true')` for screen update or run `await exportToMono('BraveLove')` for style update only
*/
test('happy', async () => {
  // await exportToMono('AdvancedHook', true, 'TeaForOne')
  // await exportToMono('BraveLove', true, 'LemonSong')
})

test('latest screen', async () => {
  await getLastestScreen()
})
