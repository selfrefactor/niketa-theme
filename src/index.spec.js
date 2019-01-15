import { createTheme } from './'
import { createRulesBee } from './bees/createRules';

const base = '/home/s/repos/y/niketa-theme/bases'
const filePath = `${ base }/niketa-yellow.json`
const rules = {
  'editor.background'                   : [ '#C9DDE9', '#DBE3D6' ],
  'activityBar.background'              : [ '#cfd5dd', '#cfd5aa' ],
  'editor.selectionBackground'          : [ '#DDE6E0', '#C8D8E2' ],
  'editor.selectionHighlightBackground' : [ '#87A190', '#51636D' ],
}

test('createTheme', () => {
  const singleColorBase = {
    'editor.background'                   : '#E1E0C5',
    'activityBar.background'              : '#cfd5dd',
    'editor.selectionBackground'          : '#C8D8E2',
    'editor.selectionHighlightBackground' : '#51636D',
  }
  const singleColor = createRulesBee(singleColorBase)

  createTheme({
    // random  : {},
    random : {
      changes  : 1,
      distance : 6,
      indexes  : [ 1 ],
    },
    filePath,
    rules: singleColor,
    levels  : 12,
    // publish : {},
    publish : {
      index : 1,
      name  : 'aqua.family',
    },
  })
})

test.skip('createTheme', () => {
  const result = createTheme({
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
