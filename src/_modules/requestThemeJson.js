import { pass } from 'rambdax'
import request from 'request-promise'

export const schema = { name : 'string' }

export async function requestThemeJson(url, fallbackName){
  try {
    const response = await request(url)
    const content = JSON.parse(response)

    if (!pass(content)(schema) && !fallbackName){
      throw new Error('no name')
    }

    if (!pass(content)(schema) && fallbackName){
      content.name = fallbackName
    }

    return content
  } catch (error) {
    console.log(error, url)

    return false
  }
}
