import { createTheme } from './'

const filePath = './themes/izorra.json'
const rules = {
  'activityBar.background' : [ '#ece3e7', '#ecf3e1' ],
  'activityBar.foreground' : [ '#076b6b', '#03aaaa' ],
}

createTheme(filePath, rules)
