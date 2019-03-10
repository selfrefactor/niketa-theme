export const COLOR_0 = [
  'storage.type',
  'markup.italic',
  'entity.name.tag',
  'variable.language.this',
  'support.function.dom.js',
  'variable.language.constructor.UNDERLINE',
]

export const COLOR_1 = [
  'entity.name.class.UNDERLINE',
  'entity.name.type.UNDERLINE',
  'entity.name.function.UNDERLINE',
  'variable',
  'constant.language.boolean',
  'constant.language.boolean.false.ts',
  'constant.language.boolean.true.ts',
  'constant.language.null.js',
]

export const COLOR_2 = [
  'variable.parameter',
  'support.function',
  'string.quoted.single.js',
  'string.quoted.single.json',
  'string.quoted.single.ts',
  'support.type.object.console.js',
  'support.function.console.js',
]

export const COLOR_3 = [
  'markup.quote',
  'variable.other.class.js',
  'constant.other.object.key.js',
  'entity.name.function.method',
  'meta.object-literal.key.js',
  'meta.object-literal.key.ts',
  'string.template',
  'support.type.property-name.json',
  'variable.other.property.js',
  'variable.other.property.ts',
]

export const COLOR_4 = [
  'support.constant',
  'constant.character',
  'constant.language',
  'constant.other',
  'comment',
  'markup.italic',
  'comment.block.documentation',
  'comment.line.double-slash',
  'punctuation.accessor.js',
  'variable.language',
  'variable.other.object.js',
  'variable.other.readwrite',
  'variable.other.readwrite.js',
  'variable.other.readwrite.ts',
  'variable.other.readwrite.tsx',
]

export const COLOR_5 = [
  'entity.other.inherited-class',
  'support.class.builtin.js',
  'keyword.control.module.js',
  'keyword.operator.accessor',
  'invalid.UNDERLINE',
  'constant.numeric',
  'keyword',
  'keyword.control.import.js',
  'keyword.control.from.js',
  'keyword.control.export.js',
  'keyword.control.default.js',
  'support.type.object.module.ts',
]

export const baseBase = {
  name   : '_Palette',
  type   : 'light',
  colors : {
    'editor.background'                : 'COLOR_BACK',
    'activityBar.background'           : 'COLOR_SECONDARY',
    'editor.selectionBackground'       : 'COLOR_SELECTION',
    'editor.lineHighlightBackground'   : 'COLOR_SECONDARY',
    'editorBracketMatch.background'    : 'COLOR_5_DARKER',
    'editorBracketMatch.border'        : 'COLOR_4_DARKER',
    'editorGroupHeader.tabsBackground' : 'COLOR_BACK_DARK',
    'editorGutter.background'          : 'COLOR_BACK',
    'editorLineNumber.foreground'      : 'COLOR_SECONDARY_DARKER',
    'scrollbarSlider.background'       : 'COLOR_SECONDARY',
    'scrollbarSlider.hoverBackground'  : 'COLOR_SECONDARY_DARKER',
    'sideBar.background'               : 'COLOR_SECONDARY_DARK',
    'statusBar.background'             : 'COLOR_SECONDARY_DARKEST',
    'tab.inactiveForeground'           : 'COLOR_1_LIGHTER',
    'tab.inactiveBackground'           : 'COLOR_SECONDARY_DARKEST',
    'tab.activeForeground'             : 'COLOR_1_DARK',
    'tab.activeBackground'             : 'COLOR_BACK',
    'tab.border'                       : 'COLOR_BACK',
  },
}

export const baseData = {
  COLOR_0,
  COLOR_1,
  COLOR_2,
  COLOR_3,
  COLOR_4,
  COLOR_5,
}
