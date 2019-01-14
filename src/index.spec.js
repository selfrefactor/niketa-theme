import { createTheme } from './'

const base = '/home/s/repos/y/niketa-theme/bases'
const filePath = `${ base }/niketa-yellow.json`
const rules = {
  'editor.background'                   : [ '#DDEEF0', '#ddebdd' ],
  'activityBar.background'              : [ '#cfd5dd', '#cfd5aa' ],
  'editor.selectionBackground'          : [ '#DDE6E0', '#C8D8E2' ],
  'editor.selectionHighlightBackground' : [ '#87A190', '#51636D' ],
}

test('createTheme', () => {
  const result = createTheme({
    // ============================================
    random : {
      changes  : 2,
      distance : 5,
      indexes  : [ 0, 1 ],
      // index    : [0,1],
    },
    // random: {},
    filePath,
    rules,
    levels  : 7,
    publish : {},
    // publish: {
    //   index: 4,
    //   base   : 'bubble',
    //   labels : [ 'lies', 'order', 'zero' ],
    // }
  })

  console.log({ result })
})
