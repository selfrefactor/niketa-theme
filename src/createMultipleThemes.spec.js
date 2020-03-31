import { exec } from 'helpers-fn'
import { resolve } from 'path'

test('happy', async () => {
  const cwd = resolve(__dirname, '../')
  await exec({
    command : 'yarn out',
    cwd,
    onLog   : () => {},
  })
})
