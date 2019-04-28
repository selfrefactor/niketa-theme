import { randomColorBee } from './randomColor'

// todo move out
test('random color', () => {
  const result = randomColorBee({
    color         : '#cfd5dd',
    numberChanges : 2,
    distance      : 5,
  })

  console.log({ result })
})
