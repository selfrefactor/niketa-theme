import { changeColorAnt } from './changeColor'

test('happy', () => {
  const result = changeColorAnt('#4a6f93', 'DARKEST')
  expect(result).toEqual('#385470')
})

test.skip('bypass colors with opacity', () => {
  const result = changeColorAnt('#4a6f93aa', 'DARKEST', 0.2)

  expect(result).toEqual('#4a6f93aa')
})

test('with opacity', () => {
  expect(changeColorAnt('#4a6f93aa', 'DARK', 0.2)).toEqual('#4a6f93D2')
  expect(changeColorAnt('#4a6f93aa', 'LIGHT', 0.2)).toEqual('#4a6f938C')
})
