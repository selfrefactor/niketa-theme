import { generateBase, generateBaseRandom } from './generateBase'

test.skip('happy', () => {
  generateBase('boring')
})

test('random', () => {
  
  expect(() => generateBaseRandom('sk')).not.toThrow()
})

