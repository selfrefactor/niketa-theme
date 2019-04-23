import { FetchTargetColor } from './fetchTargetColor'

test('happy', () => {
  const FetchTargetColorI = new FetchTargetColor({
    targets     : [ [ 'dark.2', 'red.4' ], [ 'ochra.3', 'blue.6' ] ],
    targetIndex : 1,
  })
  // expect(
  //   FetchTargetColorI.is(0)
  // ).toBe(0)
})
