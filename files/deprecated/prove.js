import { createTheme } from './'

const filePath = './bases/niketa-yellow.json'
const rules = {
  'editor.background'                   : [ '#DDEEF0', '#ddebdd' ],
  // 'editor.background'                   : [ '#DDEEF0', '#ECEDF3' ],
  // 'activityBar.background'              : [ '#cfd5dd', '#cfd5aa' ],
  'editor.selectionBackground'          : [ '#DDE6E0', '#C8D8E2' ],
  'editor.selectionHighlightBackground' : [ '#87A190', '#51636D' ],
  'editor.wordHighlightBackground'      : [ '#DDE6E0', '#E2E4F8' ],
  'editor.lineHighlightBackground'      : [ '#cfd5dd', '#aad5dd' ],
  // 'editorBracketMatch.background'       : [ '#00ff00', '#00ff00' ],
  // 'editorBracketMatch.border'           : [ '#00ff00', '#00ff00' ],
  // 'editorGroupHeader.tabsBackground'    : [ '#E3D9BB', '#E3a9BB' ],
  // 'editorGutter.background'             : [ '#EEDEBC', '#EEaEaa' ],
  // 'editorLineNumber.foreground'         : [ '#113', '#a2af74' ],
  // 'scrollbarSlider.background'          : [ '#cfd5dd', '#cfd5aa' ],
  // 'scrollbarSlider.hoverBackground'     : [ '#979788', '#ffaa8a' ],
  // 'sideBar.background'                  : [ '#cfd5dd', '#979788' ],
  // 'statusBar.background'                : [ '#cfd5dd', '#979788' ],
  // 'tab.activeForeground'                : [ '#440b0b', '#443' ],
  // 'tab.border'                          : [ '#cfd5dd', '#443' ],
  // 'tab.inactiveBackground'              : [ '#cfd5dd', '#cfd5aa' ],
  // 'tab.inactiveForeground'              : [ '#440b0b', '#443' ],
}

/**
 * If random is {} then both colors from above
 * are used to generate the themes
 *
 * If random is { change: 2, distance: 7, index:0}
 * this means change 2 digits with 7 distance from the first color
 */

/**
  * Publish is incompatible with most of arguments,
  * as it will take baboon themes and export them
  */
export function proveCreateTheme(){
  createTheme({
    // ============================================
    random : {
      change   : 2,
      distance : 7,
      index    : 0,
    },
    // random: {},
    filePath,
    rules,
    // Always used
    // ============================================
    levels  : 7,
    publish : {},
    // Uncomment only on publishing
    // ============================================
    // If random is set, then index is respected
    // and base is the exported name
    // ============================================
    // If not random, then all `labels` are published
    // Change `labels` every family-based publish
    // ============================================
    // publish: {
    //   index: 4,
    //   base   : 'bubble',
    //   labels : [ 'lies', 'order', 'zero' ],
    // }
  })
}
