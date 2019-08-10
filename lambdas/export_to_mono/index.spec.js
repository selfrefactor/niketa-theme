import { exportToMono, getLastestScreen } from './'

test('happy', async () => {
  // await exportToMono('AdvancedHook')
  await exportToMono('BraveLove', true, 'LemonSong')
})

test('latest screen', async () => {
  await getLastestScreen('BraveLove')
})
