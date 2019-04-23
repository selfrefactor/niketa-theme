import { changeColorAnt } from './changeColor'

test('changeColor', () => {
  const result = changeColorAnt('#4a6f93', 'DARKEST')
  expect(result).toEqual('#385470')
})

test('bypass colors with opacity', () => {
  const result = changeColorAnt('#4a6f93aa', 'DARKEST', 0.2)

  expect(result).toEqual('#1E2C3Baa')
})
