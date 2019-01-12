import { range } from 'rambdax'

export function createThemeBee(rules,originTheme){
  const keys = Object.keys(rules)
  
  return range(0,keys.length).map(i => {
    let newThemeColors = {}
    keys.forEach(path => {
        newThemeColors[path] = rules[path][i]
    })
    return {
      ...originTheme,
      colors: {
        ...originTheme.colors,
        ...newThemeColors
      }
    }
  })  
}
