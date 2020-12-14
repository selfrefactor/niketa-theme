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

  return [
    ...variables
  ]
}


const COLOR_0 = [
  ...ADDITIONAL_0,
  ...(buildColors(0)),
  'keyword.control.import.js',
  'storage.type.function.js',
  'entity.name.method.js.ITALIC',
  'entity.name.tag.UNDERLINE',
  'keyword.operator.module.all.js',
  'markup',
  'meta.function.arrow',
  'meta.var.expr.js',
  'punctuation.accessor.js',
  'punctuation.separator.comma.js',
  'punctuation.separator.key-value.js',
  'source.go',
  'source.js',
  'storage.modifier.js.ITALIC',
  'storage.type.ITALIC',
  'support.class.console.js',
  'support.function.dom.js',
  'support.variable.property.js',
  'text.html.derivative',
]
console.log({COLOR_0})
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
  'keyword.ITALIC',
  'markup.heading.markdown',
  'meta.brace.round.js',
  'meta.definition.property.js',
  'meta.method-call.with-arguments.js',
  'meta.tag.attributes.js',
  'punctuation.definition.tag.js',
  'support.type.primitive.js',
  'support.variable.property.js',
  'support.variable.BOLD',
]

const COLOR_2 = [
  ...ADDITIONAL_2,
  ...(buildColors(2)),
  'entity.other.attribute-name.ITALIC',
  'entity.other.attribute-name.js.ITALIC',
  'entity.name.class.js',
  'entity.name.module.js',
  'string.quoted.single.js.ITALIC',
  'keyword.control.module.js.BOLD',
  'meta.class-method.js',
  'meta.import.js',
  'meta.paragraph.markdown',
  'punctuation.definition.block.js',
  'source.css',
  'source.json',
  'support.class.promise.js',
  'support.function.BOLD',
  'support.function.console.js',
  'support.type.object.console.js',
  'support.type.object.module.js',
]

const COLOR_3 = [
  ...ADDITIONAL_3,
  ...(buildColors(3)),
  'text.html.basic.ITALIC',
  'keyword.operator.new.ITALIC',
  'support.class.component',
  'constant.other.object.key.js',
  'entity.name.function.js',
  'entity.name.function.method',
  'entity.name.tag.js',
  'entity.other.ng-binding-name.property.html',
  'keyword.control.default.js',
  'keyword.control.export.js.ITALIC',
  'keyword.control.from.js',
  'keyword.operator.accessor',
  'keyword.operator.BOLD',
  'markup.quote',
  'meta.brace.square.js',
  'meta.function.parameters.js',
  'meta.parameters.js',
  'meta.tag.js',
  'punctuation.definition.parameters.begin.js',
  'punctuation.definition.parameters.end.js',
  'punctuation.quasi.element.begin.js',
  'punctuation.quasi.element.end.js',
  'support.type.property-name.json',
  'emphasis.ITALIC',
  'markup.italic.ITALIC',
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
  'keyword.operator.decorator.js',
  'meta.function.js',
  'meta.object-literal.key.js',
  'meta.template.expression.js',
  'punctuation.accessor.js',
  'punctuation.definition.string',
  'punctuation.definition.string.begin',
  'punctuation.definition.string.end',
  'punctuation.definition.template-expression.begin.js',
  'punctuation.definition.template-expression.end.js',
  'punctuation.separator.parameter.js',
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
