import { map } from 'rambdax'

export function createRulesBee(rules){
  return map(
    color => [ color, color ],
    rules
  )
}
