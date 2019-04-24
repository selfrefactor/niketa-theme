export const COLOR_0 = [
  'support.constant',
  'punctuation.definition.template-expression.begin.js',
  'entity.name.tag.UNDERLINE',
  'punctuation.accessor.js',
  'source.js',
  'source.css',
  'source.scss',
  'storage.modifier.js',
  'string.quoted.single.js',
  'support.function.dom.js',
  'support.variable.property.js',
  'variable.language.constructor.UNDERLINE',
  'variable.language.this',
]

export const COLOR_1 = [
  'meta.selector.css',
  'constant.language.null.js',
  'entity.name.class.UNDERLINE',
  'entity.name.function.UNDERLINE',
  'markup.heading.markdown',
  'punctuation.separator.comma.js',
  'support.variable.property.js',
  'support.type.primitive.js',
  'meta.brace.square.js',
  'variable.other.class.js',
  'constant.other.object.key.js',
]

export const COLOR_2 = [
  'variable.language',
  'constant.language',
  'entity.name.type.UNDERLINE',
  'variable.parameter',
  'support.function',
  'source.json',
  'variable.other.constant.js',
  'meta.paragraph.markdown',
  'entity.other.attribute-name.js',
  'string.quoted.single.json',
  'support.class.promise.js',
  'support.type.object.console.js',
  'support.function.console.js',
  'punctuation.definition.block.js',
]

export const COLOR_3 = [
  'storage.type',
  'constant.other',
  'variable.other.object.js',
  'markup.quote',
  'meta.import.js',
  'meta.tag.js',
  'string.quoted.single.js',
  'string.template',
  'entity.name.function.method',
  'support.type.property-name.json',
  'variable.other.property.js',
]

export const COLOR_4 = [
  'markup.italic',
  'meta.object-literal.key.js',
  'meta.template.expression.js',
  'punctuation.separator.parameter.js',
  'meta.parameters.js',
  'constant.character',
  'comment',
  'keyword',
  'markup.italic',
  'comment.block.documentation',
  'comment.line.double-slash',
  'punctuation.accessor.js',
]

export const COLOR_5 = [
  'punctuation.definition.parameters.begin.js',
  'constant.language.boolean',
  'punctuation.separator.key-value.js',
  'storage.modifier.async.js',
  'meta.brace.round.js',
  'entity.other.inherited-class',
  'support.class.builtin.js',
  'meta.tag.attributes.js',
  'keyword.control.module.js',
  'keyword.operator.accessor',
  'invalid.UNDERLINE',
  'constant.numeric',
  'meta.var.expr.js',
  'keyword.control.import.js',
  'keyword.control.from.js',
  'keyword.control.export.js',
  'keyword.control.default.js',
  'support.type.object.module.js',
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
    'tab.inactiveForeground'           : 'COLOR_SECONDARY_LIGHTEST',
    'tab.inactiveBackground'           : 'COLOR_SECONDARY_DARKEST',
    'tab.activeForeground'             : 'COLOR_SECONDARY_LIGHTEST',
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

export const all = [
  ...COLOR_0,
  ...COLOR_1,
  ...COLOR_2,
  ...COLOR_3,
  ...COLOR_4,
  ...COLOR_5,
]
