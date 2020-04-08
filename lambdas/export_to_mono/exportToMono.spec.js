import { ms } from 'string-fn'
import { mapAsync } from 'rambdax'
import { exportToMono } from './exportToMono'

jest.setTimeout(ms('5 minutes'))

const themes = [
  'LedZeppelin',
  'SweatLeaf',
  'HelloSpaceboy',
  'CommunicationBreakdown',
  'GlassOnion',
  'DancingDays',
  'FunkyDrummer',
  'KozmicBlues',
  'StrangeBrew',
]

async function iterable(themeName){
  await exportToMono(themeName)
}

test('happy', async () => {
  // await mapAsync(iterable, themes)
})
