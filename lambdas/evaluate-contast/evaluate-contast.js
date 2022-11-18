import { colorContrastRatioCalculator } from '@mdhnpm/color-contrast-ratio-calculator'
import { map } from 'rambdax'
import { BACK_COLOR } from '../../src/assets/chrome-colors'
import { allThemes } from '../../src/assets/themes-colors'

export function evaluateContrast(){
  let result = map((currentTheme) => {
    return map(color => {
      const score = colorContrastRatioCalculator(color, BACK_COLOR)
      return `${ color } - ${ score }`
    }, currentTheme)
  }, allThemes)
  console.log(result, `result`)
}
