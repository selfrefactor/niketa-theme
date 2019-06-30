import { writeJsonAnt } from './ants/writeJson'
import { pascalCase } from 'string-fn'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { generateThemeDataBee } from './bees/generateThemeData'
import { readJsonAnt } from './ants/readJson'
import { maybe, map, defaultTo } from 'rambdax'

export const baseColors = {
  'diffEditor.removedTextBackground'  : '#64B5F655',
  'diffEditor.insertedTextBackground' : '#9c824a55',
  'activityBar.background'            : '#C4BE9D',
  // 'activityBar.background'            : '#cccdc5f2',
  'editor.selectionBackground'        : '#94525755',
  'editorBracketMatch.background'     : '#B1365Bf3',
  'editorBracketMatch.border'         : '#9F7E6Bf3',
  'editorGroupHeader.tabsBackground'  : '#F2EBE1',
  'editorLineNumber.foreground'       : '#2a3343a9',
  'scrollbarSlider.background'        : '#C4BE9D',
  'scrollbarSlider.hoverBackground'   : '#C4BE9D',
  'sideBar.background'                : '#C4BE9D',
  'statusBar.background'              : '#C4BE9D',
  'editor.lineHighlightBackground'    : '#F2EBE1',
  'tab.activeBackground'              : '#35495f',
  'tab.inactiveForeground'            : '#fafafa',
  'tab.inactiveBackground'            : '#859da9e9',
}

function getBaseColors(back){
  return {
    ...baseColors,
    'tab.activeBackground' : back,
  }
}

const SETTINGS = {}
SETTINGS[ 0 ] = {
  back    : '#f9f6f2',
  mode    : 'advanced',
  label   : 'bat',
  COLOR_0 : '#B06775E9',
  COLOR_1 : '#54ABB5E9',
  COLOR_2 : '#CF6F4Bf3',
  COLOR_3 : '#8F1C3DE9',
}
SETTINGS[ 1 ] = {
  back    : '#f9f6f2',
  mode    : 'advanced',
  label   : 'cat',
  COLOR_0 : '#5a6598fa',
  COLOR_1 : '#B45948f1',
  COLOR_2 : '#6E3E53C6',
  COLOR_3 : '#861D4FCF',
  COLOR_4 : '#4381A8E9',
}
SETTINGS[ 1 ] = {
  back    : '#f9f6f2',
  mode    : 'advanced',
  label   : 'dog',
  COLOR_0 : '#af3564fa',
  COLOR_1 : '#C26F63fa',
  COLOR_2 : '#533963f1',
  COLOR_3 : '#7F8E52f1',
}
// lemon song
SETTINGS[ 2 ] = {
  back    : '#f9f6f1',
  mode    : 'advanced',
  label   : 'engine',
  COLOR_0 : '#1E416E',
  COLOR_1 : '#38978D',
  COLOR_2 : '#B97444',
}
// heartbreaker
SETTINGS[ 3 ] = {
  back    : '#f9f6f1',
  mode    : 'advanced',
  label   : 'hook',
  COLOR_0 : '#9C8058',
  COLOR_1 : '#f26153',
  COLOR_2 : '#096165',
}
// dancing days
SETTINGS[ 4 ] = {
  back    : '#f9f6f1',
  mode    : 'advanced',
  label   : 'immigrant',
  COLOR_0 : '#063672',
  COLOR_1 : '#ff5177',
  COLOR_2 : '#b76144',
  COLOR_3 : '#0068a8',
}

SETTINGS[ 5 ] = {
  back    : '#f1f1f1',
  mode    : 'advanced',
  label   : 'mystery',
  COLOR_0 : '#2b8fb3',
  COLOR_1 : '#a0512c',
  COLOR_2 : '#BD2E63',
  COLOR_3 : '#E9630D',
  COLOR_4 : '#508546',
  COLOR_5 : '#880e4f',
}
SETTINGS[ 6 ] = {
  mode    : 'brave',
  label   : 'habits',
  COLOR_0 : '#D27837',
  COLOR_1 : '#3b6160bb',
  COLOR_2 : '#6a3951',
  COLOR_3 : '#4EBFBB',
}
SETTINGS[ 7 ] = {
  back    : '#f3f0e0',
  mode    : 'brave',
  label   : 'homer',
  COLOR_0 : '#AD8310',
  COLOR_1 : '#3782AF',
  COLOR_2 : '#E0AA15',
  COLOR_3 : '#884b50',
  COLOR_4 : '#B84251',
  COLOR_5 : '#406F64',
}
SETTINGS[ 8 ] = {
  back    : '#f3f0e0',
  mode    : 'brave',
  label   : 'love',
  COLOR_0 : '#5482ab',
  COLOR_1 : '#7e1b24',
  COLOR_2 : '#466261',
  COLOR_3 : '#A24877',
}
// lemon song
SETTINGS[ 9 ] = {
  back    : '#f3f0e0',
  mode    : 'brave',
  label   : 'neighbour',
  COLOR_0 : '#1E416E',
  COLOR_1 : '#38978D',
  COLOR_2 : '#B97444',
}
SETTINGS[ 10 ] = {
  mode    : 'circus',
  label   : 'ajax',
  COLOR_0 : '#5c4c78',
  COLOR_1 : '#399090',
  COLOR_2 : '#427BB0',
  COLOR_3 : '#d8576a',
}
// label      : 'since.loving',
SETTINGS[ 11 ] = {
  back    : '#f9f6f1',
  mode    : 'circus',
  label   : 'brother',
  COLOR_0 : '#B1365B',
  COLOR_1 : '#5F7E97',
  COLOR_2 : '#9F7E6B',
}
// label      : 'tea.for'
SETTINGS[ 12 ] = {
  back    : '#f9f6f1',
  mode    : 'circus',
  label   : 'people',
  COLOR_0 : '#89325f',
  COLOR_1 : '#b56e30',
  COLOR_2 : '#356a6d',
}
// label      : 'in.light',
SETTINGS[ 13 ] = {
  mode    : 'circus',
  label   : 'whisky',
  COLOR_0 : '#3782AF',
  COLOR_1 : '#0d8a81',
  COLOR_2 : '#A0595E',
}

SETTINGS[ 14 ] = {
  mode    : 'niketa',
  label   : 'owl',
  COLOR_0 : '#2f586f',
  COLOR_1 : '#8c7647',
  COLOR_2 : '#df5831',
}

export function getChrome(mode, back){
  if (mode === 'advanced'){
    const actualBack = defaultTo('#FAF8F3', back)

    return {
      ...getBaseColors(actualBack),
      'editor.background' : actualBack,
    }
  }
  if (mode === 'brave'){
    const actualBack = defaultTo('#f3f0e0', back)

    return {
      ...getBaseColors(actualBack),
      'editor.background' : actualBack,
    }
  }

  if (mode === 'circus'){
    const actualBack = defaultTo('#ede8e1', back)

    return {
      ...getBaseColors(actualBack),
      'editor.background' : actualBack,
    }
  }
  const actualBack = defaultTo('#d8d5c9', back)

  return {
    ...getBaseColors(actualBack),
    'editor.background' : actualBack,
  }
}

test('happy', () => {
  map(
    ({ mode, label, back, ...colors }) => {
      const paletteMode = maybe(
        colors.COLOR_5,
        'six',
        colors.COLOR_4 ? 'five' : maybe(
          colors.COLOR_3,
          'four',
          'three'
        )
      )
      const chrome = getChrome(mode)
      const palette = readJsonAnt(`palettes/${ paletteMode }.json`)
      const themeData = generateThemeDataBee({
        palette,
        chrome,
        colors,
      })
      themeData.name = pascalCase(`${ mode }.${ label }`)
      console.log(themeData.name)

      writeJsonAnt(`themes/${ themeData.name }.json`, themeData)
    }
  )(SETTINGS)
  const exported = readJsonAnt(
    'exported.json'
  )
  saveToPackageJsonAnt(exported)
  expect(
    1
  ).toBeTruthy()
})

/*
  Brother alternative
  SETTINGS[ 11 ] = {
  back: '#f6f4e8',
  mode    : 'circus',
  label   : 'brother',
  COLOR_1: "#ad404f",
  COLOR_0: "#57668f",
  COLOR_2: "#968420"
}
*/

/*
  SETTINGS[ 12 ] = {
  back: '#f3f3e2',
  mode    : 'circus',
  label   : 'people',
  COLOR_0: "#23515F",
  COLOR_1: "#C03A71",
  COLOR_2: "#A17798",
  COLOR_3: "#245115",
  COLOR_4: "#256FA1"
}
*/
