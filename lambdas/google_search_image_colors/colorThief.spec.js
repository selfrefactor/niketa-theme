const {getColor} = require('./colorThief')
const {resolve} = require('path')

test('happy', async () => {
    const result = await getColor(resolve(__dirname, '../../files/niketa_young.jpg'))
    console.log(result);
    
    // expect(result).toBe(expected)
})