import { changeColorAnt } from './changeColor'

test('changeColor', () => {
  const result = changeColorAnt('#4a6f93', 'DARKER')
  expect(result).toEqual('#2C4358')
})