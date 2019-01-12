import { createTheme } from './'

const filePath = './themes/izorra.json'
const rules = {
  'editor.wordHighlightBackground'      : [ '#DDE6E0', '#faaaaa' ],
  'editor.selectionBackground'          : [ '#DDE6E0', '#fafafa' ],
  'editor.selectionHighlightBackground' : [ '#87A190', '#faaaaa' ],
  'editor.background'                   : [ '#fffdfe', '#E5F5EB' ],
}

createTheme({
  filePath,
  rules,
  levels : 3,
  base   : 'bee',
  labels : [ 'kangroo', 'solid', 'wall' ],
})

