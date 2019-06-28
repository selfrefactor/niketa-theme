const getContrastRatio = require('get-contrast-ratio');
import {readJsonSync, outputJsonSync} from 'fs-extra'
const path = '/home/s/.config/Code - Exploration/User/settings.json'

export function evaluateContrast(themeColors){
  // const a = getContrastRatio.default('#433', '#fafafa');
  const current = readJsonSync(path)
  const newState = {
    ...current,
    "workbench.colorTheme": "BraveHomer"
  }
  outputJsonSync(path, newState, {spaces: 2})
}
 
test('happy', () => {
  evaluateContrast()
})