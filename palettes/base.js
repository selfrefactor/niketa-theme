import { shuffle, splitEvery } from 'rambdax'

import { missingScopes } from '../lambdas/find_missing_rules/missingScopes.json'

const [
  ADDITIONAL_0,
  ADDITIONAL_1,
  ADDITIONAL_2,
  ADDITIONAL_3,
  ADDITIONAL_4,
] = splitEvery(Math.ceil(missingScopes.length / 5), shuffle(missingScopes))

const COLOR_0 = [
  ...ADDITIONAL_0,
  'variable.import.parameter.js',
  'source.go',
  'entity.name.tag.UNDERLINE',
  'variable.language.constructor.UNDERLINE',
  'markup.italic',
  'text.html.derivative',
  'punctuation.accessor.js',
  'source.js',
  'variable.parameter',
  'storage.modifier.js',
  'entity.name.method.js',
  'punctuation.separator.key-value.js',
  'storage.type',
  'string.quoted.single.js',
  'support.function.dom.js',
  'meta.var.expr.js',
  'punctuation.separator.comma.js',
  'support.variable.property.js',
  'variable.language.this',
]

const COLOR_1 = [
  ...ADDITIONAL_1,
  'keyword',
  'expression.ng',
  'entity.name.tag.class.js',
  'meta.brace.round.js',
  'constant.language.boolean',
  'constant.numeric',
  'constant.language.null.js',
  'punctuation.definition.tag.js',
  'entity.name.class.UNDERLINE',
  'entity.name.function.UNDERLINE',
  'entity.name.type.UNDERLINE',
  'string.template.js',
  'markup.heading.markdown',
  'meta.tag.attributes.js',
  'support.variable.property.js',
  'support.type.primitive.js',
  'variable',
]

const COLOR_2 = [
  ...ADDITIONAL_2,
  'string.quoted.double.html',
  'keyword.control.import.js',
  'source.json',
  'source.css',
  'entity.name.module.js',
  'support.function',
  'variable.other.constant.js',
  'support.type.object.module.js',
  'meta.import.js',
  'variable.other.object.js',
  'meta.paragraph.markdown',
  'entity.other.attribute-name.js',
  'string.quoted.single.js',
  'string.quoted.single.json',
  'meta.class-method.js',
  'keyword.control.module.js',
  'support.class.promise.js',
  'support.type.object.console.js',
  'support.function.console.js',
  'punctuation.definition.block.js',
]

const COLOR_3 = [
  ...ADDITIONAL_3,
  'constant.other.object.key.js',
  'entity.name.function.method',
  'entity.other.ng-binding-name.property.html',
  'keyword.control.default.js',
  'keyword.control.export.js',
  'keyword.control.from.js',
  'keyword.operator.accessor',
  'markup.quote',
  'meta.brace.square.js',
  'meta.parameters.js',
  'meta.tag.js',
  'entity.name.tag.js',
  'entity.name.function.js',
  'punctuation.definition.parameters.begin.js',
  'punctuation.definition.parameters.end.js',
  'string.unquoted.label.js',
  'string.template',
  'support.type.property-name.json',
  'variable.other.class.js',
  'variable.other.property.js',
]

const COLOR_4 = [
  ...ADDITIONAL_4,
  'entity.other.ng-binding-name.outputReplEvent.html',
  'entity.other.inherited-class',
  'support.constant',
  'punctuation.separator.parameter.js',
  'constant.character',
  'constant.language',
  'tag.decorator.js',
  'constant.other',
  'support.class.builtin.js',
  'comment',
  'markup.italic',
  'meta.object-literal.key.js',
  'comment.block.documentation',
  'comment.line.double-slash',
  'punctuation.accessor.js',
  'invalid.UNDERLINE',
  'variable.language',
  'storage.modifier.async.js',
  'variable.other.readwrite',
  'punctuation.definition.template-expression.begin.js',
  'punctuation.definition.template-expression.end.js',
  'punctuation.definition.template-expression.begin.ts',
  'punctuation.definition.template-expression.end.ts',
  'meta.template.expression.js',
  'variable.other.readwrite.js',
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
