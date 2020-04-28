import { exec } from 'helpers-fn'
import { resolve } from 'path'

import { createMultipleThemes } from './createMultipleThemes'

test('happy', async () => {
  await createMultipleThemes()
  // const cwd = resolve(__dirname, '../')
  // await exec({
  //   command : 'yarn out',
  //   cwd,
  //   onLog   : () => {},
  // })
})
