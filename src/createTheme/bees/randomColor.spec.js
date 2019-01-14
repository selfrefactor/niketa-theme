import { randomColorBee } from './randomColor'

test('random color', () => {
  const result = randomColorBee({
    color: '#4a397d',
    numberChanges: 2,
    distance: 5
  })
  
  console.log({result})
})