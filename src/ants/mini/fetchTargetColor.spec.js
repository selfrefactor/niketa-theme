import { FetchTargetColor } from './fetchTargetColor'

const FetchTargetColorI = new FetchTargetColor({
  targets     : [ [ 'dark.2', 'red.4' ], [ 'back.0', 'blue.6' ] ],
  targetIndex : 1,
})

test('return color key', () => {
  expect(
    FetchTargetColorI.isSimple(0)
  ).toBe('back.0')
})

test('return actual color', () => {
  expect(
    FetchTargetColorI.is(0)
  ).toBe('#fafafa')
})
