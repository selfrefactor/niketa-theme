import { ok } from 'rambdax'
import request from 'request-promise'
const rawHead = 'https://raw.githubusercontent.com/'

export const schema = {name:'string', type:'string'}

export async function requestThemeJson(url){
    try {
        const response = await request(url)
        const content = JSON.parse(response)
        ok(content)(schema)

        return content
    } catch (error) {
        console.log(error);
        
        return false
    }
}
