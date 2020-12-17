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
    'variable.import.parameter.js',
    'variable.language.constructor.UNDERLINE',
  ],
  '1': [
    'variable.BOLD',
    'variable.parameter.ITALIC',
  ],
  '2': [
    'variable.language.prototype.js.ITALIC',
    'variable.language.this.ITALIC',
    'variable.language.this.js.ITALIC',
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

const PUNCTUATIONS = [
  'punctuation.definition.parameters.begin.js',
  'punctuation.definition.parameters.end.js',
  'punctuation.quasi.element.begin.js',
  'punctuation.quasi.element.end.js',
  'punctuation.definition.tag.js',
  'punctuation.accessor.js',
  'punctuation.separator.comma.js',
  'punctuation.separator.key-value.js',
  'punctuation.definition.block.js',
  'punctuation.accessor.js',
  'punctuation.definition.string',
  'punctuation.definition.string.begin',
  'punctuation.definition.string.end',
  'punctuation.definition.template-expression.begin.js',
  'punctuation.definition.template-expression.end.js',
  'punctuation.separator.parameter.js',
]

const FOO = {
  '0': [
  ],
  '1': [
  ],
  '2': [
  ],
  '3':[
  ],
  '4':[
  ]
}

function buildColors(modeInput){
  const mode = String(modeInput)
  const variables = defaultTo([], VARIABLES[mode])
  const keywords = defaultTo([], KEYWORDS[mode])

  return [
    ...variables,
    ...keywords,
  ]
}

const COLOR_0 = [
  ...ADDITIONAL_0,
  ...(buildColors(0)),
  'entity.name.method.js.ITALIC',
  'entity.name.tag.UNDERLINE',
  'markup',
  'meta.function.arrow',
  'meta.var.expr.js',
  'source.go',
  'source.js',
  'storage.modifier.js.ITALIC',
  'storage.type.ITALIC',
  'storage.type.function.js',
  'support.class.console.js',
  'support.function.dom.js',
  'support.variable.property.js',
  'text.html.derivative',
]

const COLOR_1 = [
  ...ADDITIONAL_1,
  ...(buildColors(1)),
  'constant.language.boolean.BOLD',
  'constant.language.null.js',
  'constant.numeric.BOLD',
  'entity.name.class.UNDERLINE',
  'entity.name.function.UNDERLINE',
  'entity.name.tag.class.js.BOLD',
  'entity.name.type.UNDERLINE',
  'entity.name.type.js.BOLD',
  'expression.ng.ITALIC',
  'markup.heading.markdown',
  'meta.brace.round.js',
  'meta.definition.property.js',
  'meta.method-call.with-arguments.js',
  'meta.tag.attributes.js',
  'support.type.primitive.js',
  'support.variable.property.js',
  'support.variable.BOLD',
]

const COLOR_2 = [
  ...ADDITIONAL_2,
  ...PUNCTUATIONS,
  ...(buildColors(2)),
  'entity.name.class.js',
  'entity.name.module.js',
  'entity.other.attribute-name.ITALIC',
  'entity.other.attribute-name.js.ITALIC',
  'meta.class-method.js',
  'meta.import.js',
  'meta.paragraph.markdown',
  'source.css',
  'source.json',
  'string.quoted.single.js.ITALIC',
  'support.class.promise.js',
  'support.function.BOLD',
  'support.function.console.js',
  'support.type.object.console.js',
  'support.type.object.module.js',
]

const COLOR_3 = [
  ...ADDITIONAL_3,
  ...(buildColors(3)),
  'constant.other.object.key.js',
  'emphasis.ITALIC',
  'entity.name.function.js',
  'entity.name.function.method',
  'entity.name.tag.js',
  'entity.other.ng-binding-name.property.html',
  'markup.italic.ITALIC',
  'markup.quote',
  'meta.brace.square.js',
  'meta.function.parameters.js',
  'meta.parameters.js',
  'meta.tag.js',
  'support.class.component',
  'support.type.property-name.json',
  'text.html.basic.ITALIC',
]

const COLOR_4 = [
  ...ADDITIONAL_4,
  ...(buildColors(4)),
  'comment.ITALIC',
  'comment.block.documentation.ITALIC',
  'comment.line.double-slash.ITALIC',
  'constant.BOLD',
  'constant.character.BOLD',
  'constant.language.BOLD',
  'constant.other.BOLD',
  'entity.name.variable.BOLD',
  'entity.other.inherited-class',
  'entity.other.ng-binding-name.outputReplEvent.html',
  'invalid.UNDERLINE',
  'meta.function.js',
  'meta.object-literal.key.js',
  'meta.template.expression.js',  
  'storage.modifier.async.js',
  'string.quoted.double.html.ITALIC',
  'string.quoted.double.json.ITALIC',
  'string.quoted.single.json.ITALIC',
  'string.template.ITALIC',
  'string.template.js.ITALIC',
  'string.unquoted.js.ITALIC',
  'string.unquoted.label.js.ITALIC',
  'support.class.builtin.js',
  'support.constant',
  'support.function.mutator.js',
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
