import { colorContrastRatioCalculator } from '@mdhnpm/color-contrast-ratio-calculator'
import { map } from 'rambdax'
import { BACK_COLOR } from '../../src/assets/chrome-colors'
import { allThemes } from '../../src/assets/themes-colors'

export function evaluateContrast(){
  let max = Infinity
  let maxInfo
  let minInfo
  let min = 0
  let result = map((currentTheme, name) => {
    return map(color => {
      const score = colorContrastRatioCalculator(color, BACK_COLOR)
      if(score > min){
        min = score
        minInfo = `${ color } - ${ name } - ${score}`
      } 
      if(score < max){
        max = score
        maxInfo = `${ color } - ${ name } - ${score}`
      }
      return `${ color } - ${ score }`
    }, currentTheme)
  }, allThemes)
  console.log(result)
  console.log({maxInfo, minInfo})
}
