import { map } from 'rambdax'

export function createRulesBee(rules){
  return map(
    color => {
      if (Array.isArray(color)) return color

      return [ color, color ]
    },
    rules
  )
}
