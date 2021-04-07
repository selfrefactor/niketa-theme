import { defaultTo, splitEvery } from 'rambdax'

import { missingScopes } from '../lambdas/find_missing_rules/missingScopes'

const [
  ADDITIONAL_0,
  ADDITIONAL_1,
  ADDITIONAL_2,
  ADDITIONAL_3,
  ADDITIONAL_4,
] = splitEvery(Math.ceil(missingScopes.length / 5), missingScopes)

const VARIABLES = {
  '0': [
    'variable.language.this.ITALIC',
    'variable.language.this.js.ITALIC',
    'variable.import.parameter.js',
    'variable.language.constructor.UNDERLINE',
  ],
  '1': [
    'variable.BOLD',
    'variable.parameter.ITALIC',
  ],
  '2': [
    'variable.language.prototype.js.ITALIC',
    'variable.other.class.js',
    'variable.other.constant.js',
    'variable.other.object.property.js',
    'variable.other.property.js',
    'variable.other.object.js',
    'variable.other.readwrite',
    'variable.other.readwrite.js',
    'variable.other.readwrite.alias.js',
    'variable.other.readwrite.decorator.js',
  ],
  '3':[
    'variable.object.property.js',
  ],
  '4':[
  'variable.language.ITALIC',
  ]
}

const KEYWORDS = {
  '0': [
    'keyword.control.import.js',
    'keyword.operator.module.all.js',
  ],
  '1': [
  'keyword.ITALIC',
  ],
  '2': [
  'keyword.control.module.js.BOLD',
  ],
  '3':[
    'keyword.control.default.js',
    'keyword.control.export.js.ITALIC',
    'keyword.control.from.js',
    'keyword.operator.BOLD',
    'keyword.operator.accessor',
    'keyword.operator.new.ITALIC',
  ],
  '4':[
  'keyword.operator.decorator.js',
  ]
}

const PUNCTUATIONS = {
  '0': [
    'punctuation.definition.block.js',
    'punctuation.definition.parameters.begin.js',
    'punctuation.definition.parameters.end.js',
    'punctuation.definition.tag.js',
    'punctuation.definition.string',
    'punctuation.definition.string.begin',
    'punctuation.definition.string.end',
  ],
  '1': [
    'punctuation.definition.template-expression.begin.js',
    'punctuation.definition.template-expression.end.js',
  ],
  '2': [
    'punctuation.quasi.element.begin.js',
    'punctuation.quasi.element.end.js',
    'punctuation.accessor.js',
    'punctuation.separator.comma.js',
    'punctuation.separator.key-value.js',
    'punctuation.accessor.js',
    'punctuation.separator.parameter.js',
  ],
  '3':[
  ],
  '4':[
  ]
}

const CONSTANTS = {
  '0': [
  ],
  '1': [
  ],
  '2': [
    'constant.language.boolean.BOLD',
    'constant.language.null.js',
    'constant.numeric.BOLD',
  ],
  '3':[
  'constant.other.object.key.js',
  ],
  '4':[
    'constant.BOLD',
    'constant.character.BOLD',
    'constant.language.BOLD',
    'constant.other.BOLD',
  ]
}
const CSS = {
  '0': [
    "source.sass",
    "source.scss",
    "source.less",
    "source.stylus",
    "source.postcss",
    "support.type.property-name.css",
    "support.type.property-name.scss",
    "support.type.property-name.less",
    "support.type.property-name.sass",
  ],
  '1': [
    "variable.css",
    "variable.scss",
    "variable.less",
    "variable.sass",
  ],
  '2': [
    "variable.css.string",
    "variable.scss.string",
    "variable.less.string",
    "variable.sass.string",
  ],
  '3':[
    "unit.css",
    "unit.scss",
    "unit.less",
    "unit.sass",
  ],
  '4':[
    "constant.numeric.css",
    "constant.numeric.scss",
    "constant.numeric.less",
    "constant.numeric.sass",
    "function.css",
    "function.scss",
    "function.less",
    "function.sass",
  ]
}

const ENTITIES = {
  '0': [
    'entity.name.method.js.ITALIC',
    'entity.name.tag.UNDERLINE',
  ],
  '1': [
    'entity.name.class',
    'entity.name.function',
    'entity.name.type.UNDERLINE',
    'entity.name.tag.class.js.BOLD',
    'entity.name.type.js.BOLD',
  ],
  '2': [
    'entity.name.class.js',
    'entity.name.module.js',
    'entity.other.attribute-name.ITALIC',
    'entity.other.attribute-name.js.ITALIC',
  ],
  '3':[
    'entity.name.function.js',
    'entity.name.function.method',
    'entity.name.tag.js',
    'entity.other.ng-binding-name.property.html',
  ],
  '4':[
    'entity.name.tag.css',
    'entity.name.variable.BOLD',
    'entity.other.inherited-class',
    'entity.other.ng-binding-name.outputReplEvent.html',
  ]
}

const STRINGS = {
  '0': [
  ],
  '1': [
    'string.quoted.single.js.ITALIC',
  ],
  '2': [
  ],
  '3':[
  ],
  '4':[
    'string.quoted.double.html.ITALIC',
    'string.quoted.double.json.ITALIC',
    'string.quoted.single.json.ITALIC',
    'string.template.ITALIC',
    'string.template.js.ITALIC',
    'string.unquoted.js.ITALIC',
    'string.unquoted.label.js.ITALIC',
  ]
}

const SUPPORTS = {
  '0': [
    'support.class.console.js',
    'support.function.dom.js',
    'support.variable.property.js',
  ],
  '1': [
    'support.type.property-name.json',
  ],
  '2': [
    'support.class.promise.js',
    'support.function.BOLD',
    'support.function.console.js',
    'support.type.object.console.js',
    'support.type.object.module.js',
  ],
  '3':[
    'support.type.property-name.css',
    'support.class.component',
  ],
  '4':[
    'support.type.primitive.js',
    'support.variable.property.js',
    'support.variable.BOLD',
    'support.class.builtin.js',
    'support.constant',
    'support.function.mutator.js',
  ]
}

const METAS = {
  '0': [
    'meta.function.arrow',
    'meta.var.expr.js',
  ],
  '1': [
    'meta.brace.round.js',
    'meta.definition.property.js',
    'meta.method-call.with-arguments.js',
    'meta.tag.attributes.js',
  ],
  '2': [
    'meta.class-method.js',
    'meta.import.js',
    'meta.paragraph.markdown',
  ],
  '3':[
    'meta.brace.square.js',
    'meta.function.parameters.js.UNDERLINE',
    'meta.parameters.js',
    'meta.tag.js',
  ],
  '4':[
    'meta.function.js',
    'meta.object-literal.key.js',
    'meta.template.expression.js',  

  ]
}

const STORAGES = {
  '0': [
    'storage.modifier.js.ITALIC',
    'storage.type.ITALIC',
    'storage.type.function.js',
  ],
  '1': [
  ],
  '2': [
  ],
  '3':[
  ],
  '4':[
  'storage.modifier.async.js',
  ]
}

function buildColors(modeInput){
  const mode = String(modeInput)
  const variables = defaultTo([], VARIABLES[mode])
  const keywords = defaultTo([], KEYWORDS[mode])
  const storages = defaultTo([], STORAGES[mode])
  const metas = defaultTo([], METAS[mode])
  const supports = defaultTo([], SUPPORTS[mode])
  const strings = defaultTo([], STRINGS[mode])
  const entities = defaultTo([], ENTITIES[mode])
  const constants = defaultTo([], CONSTANTS[mode])
  const punctuations = defaultTo([], PUNCTUATIONS[mode])
  const css = defaultTo([], CSS[mode])

  return [
    ...css,
    ...constants,
    ...entities,
    ...keywords,
    ...metas,
    ...punctuations,
    ...storages,
    ...strings,
    ...supports,
    ...variables,
  ]
}

const COLOR_0 = [
  ...ADDITIONAL_0,
  ...(buildColors(0)),
  'markup',
  'source.go',
  'source.js',
  'text.html.derivative',
]

const COLOR_1 = [
  ...ADDITIONAL_1,
  ...(buildColors(1)),
  'expression.ng.ITALIC',
  'markup.heading.markdown',
]

const COLOR_2 = [
  ...ADDITIONAL_2,
  ...(buildColors(2)),
  'source.css',
  'source.json',
]

const COLOR_3 = [
  ...ADDITIONAL_3,
  ...(buildColors(3)),
  'emphasis.ITALIC',
  'markup.italic.ITALIC',
  'markup.quote',
  'text.html.basic.ITALIC',
]

const COLOR_4 = [
  ...ADDITIONAL_4,
  ...(buildColors(4)),
  'comment.ITALIC',
  'comment.block.documentation.ITALIC',
  'comment.line.double-slash.ITALIC',
  'invalid',
  'tag.decorator.js',
]

export const baseBase = {
  name   : '_Palette',
  type   : 'light',
  colors : {},
}

export const baseData = {
  COLOR_0,
  COLOR_1,
  COLOR_2,
  COLOR_3,
  COLOR_4,
}

export const all = [
  ...COLOR_0,
  ...COLOR_1,
  ...COLOR_2,
  ...COLOR_3,
  ...COLOR_4,
]
