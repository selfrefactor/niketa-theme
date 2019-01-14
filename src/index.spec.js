import { createTheme } from './'

const base = '/home/s/repos/y/niketa-theme/bases'
const filePath = `${ base }/niketa-yellow.json`
const rules = {
  'editor.background'                   : [ '#C9DDE9', '#DBE3D6' ],
  'activityBar.background'              : [ '#cfd5dd', '#cfd5aa' ],
  'editor.selectionBackground'          : [ '#DDE6E0', '#C8D8E2' ],
  'editor.selectionHighlightBackground' : [ '#87A190', '#51636D' ],
}

test('createTheme', () => {
  const result = createTheme({
    // ============================================
    // random : {
    //   changes  : 1,
    //   distance : 6,
    //   indexes  : [ 0, 1 ],
    // },
    random  : {},
    filePath,
    rules,
    levels  : 12,
    // publish : {},
    publish : {
      index : 8,
      name  : 'aqua.shake',
    },
  })

  console.log({ result })
})
