import { randomColorBee } from './randomColor'

test('random color', () => {
  const result = randomColorBee({
    color         : '#cfd5dd',
    numberChanges : 2,
    distance      : 5,
  })

  console.log({ result })
})
