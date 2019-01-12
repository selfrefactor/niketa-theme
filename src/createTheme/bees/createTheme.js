import { range } from 'rambdax'

export function createThemeBee(rules, originTheme){
  const keys = Object.keys(rules)

  return range(0, rules[ keys[ 0 ] ].length).map(i => {
    const newThemeColors = {}
    keys.forEach(path => {
      newThemeColors[ path ] = rules[ path ][ i ]
    })

    return {
      ...originTheme,
      colors : {
        ...originTheme.colors,
        ...newThemeColors,
      },
    }
  })
}
