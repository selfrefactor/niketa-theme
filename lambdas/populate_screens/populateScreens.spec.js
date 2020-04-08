import { populateScreens } from './populateScreens'

test('happy', () => {
  expect(() => populateScreens()).not.toThrow()
})
