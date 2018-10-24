import { remove, prepend, s, split, join } from 'rambdax'

const rawHead = 'https://raw.githubusercontent.com/'

export function toRawUrl(url){
  s()

  return url
    .s(split('/blob/'))
    .s( ([a,b]) => ([
        remove('https://github.com/', a),
        b
    ])
    .s(join('/'))
    .s(prepend(rawHead))
}
