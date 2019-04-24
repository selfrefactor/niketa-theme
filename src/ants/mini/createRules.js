import { map } from 'rambdax'

export function createRules(rules){
  return map(
    color => {
      if (Array.isArray(color)) return color

      return [ color, color ]
    },
    rules
  )
}
