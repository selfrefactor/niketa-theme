import { generateThemeDataBee } from './generateThemeData'

test('random color', () => {
  const result = generateThemeDataBee({
    color         : '#cfd5dd',
    numberChanges : 2,
    distance      : 5,
  })

})
