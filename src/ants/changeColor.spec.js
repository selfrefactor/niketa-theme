import { changeColorAnt } from './changeColor'

test('changeColor', () => {
  const result = changeColorAnt('#4a6f93', 'DARKEST')
  expect(result).toEqual('#385470')
})

test('changeColor', () => {
  const result = changeColorAnt('#4a6f9366', 'DARKEST')
  expect(result).toEqual('#4a6f9366')
})
