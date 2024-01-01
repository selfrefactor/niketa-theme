const { filter } = require('rambdax')
const {
  configs: { 'recommended-alphabetical': { rules: perfectionistRulesImport } },
} = require('eslint-plugin-perfectionist')

function getPerfectionistRules() {
  const rules = {}
  Object.keys(perfectionistRulesImport).forEach((key) => {
    rules[key] = [1, ...perfectionistRulesImport[key].slice(1)]
  })
  return rules
}

const perfectionistRules = getPerfectionistRules()

// https://eslint.style/rules/js
const stylisticRules = {
  '@stylistic/arrow-spacing': [1, { after: true, before: false }],
}

const rules = {
  ...perfectionistRules,
  // ...stylisticRules,
  'consistent-type-assertions': 0,
  'explicit-module-boundary-types': 0,
  'no-array-constructor': 1,
  'no-confusing-void-expression': 0,
  'no-empty-function': 0,
  'no-floating-promises': 0,
  'no-non-null-assertion': 0,
  'no-prototype-builtins': 0,
  'no-undef': 0,
  'no-unnecessary-condition': 0,
  'no-unsafe-argument': 0,
  'no-unsafe-assignment': 0,
  'no-unsafe-call': 0,
  'no-unsafe-member-access': 0,
  'no-unsafe-return': 0,
  'no-unused-vars': 0,
  'no-use-before-define': 2,
  'prefer-nullish-coalescing': [
    0,
    {
      forceSuggestionFixer: true,
      ignoreConditionalTests: true,
      ignoreMixedLogicalExpressions: true,
    },
  ],
  'prefer-optional-chain': 0,
  'require-await': 2,
  'restrict-template-expressions': 0,
  'unused-imports/no-unused-imports': 1,
  'unused-imports/no-unused-vars': 1,
}

const deprecatedRules = [
  'array-bracket-newline',
  'array-bracket-spacing',
  'array-element-newline',
  'arrow-parens',
  'arrow-spacing',
  'block-spacing',
  'brace-style',
  'comma-dangle',
  'comma-spacing',
  'comma-style',
  'computed-property-spacing',
  'dot-location',
  'eol-last',
  'func-call-spacing',
  'function-call-argument-newline',
  'function-paren-newline',
  'generator-star-spacing',
  'implicit-arrow-linebreak',
  'indent',
  'jsx-quotes',
  'key-spacing',
  'keyword-spacing',
  'linebreak-style',
  'lines-between-class-members',
  'lines-around-comment',
  'max-len',
  'max-statements-per-line',
  'multiline-ternary',
  'new-parens',
  'newline-per-chained-call',
  'no-confusing-arrow',
  'no-extra-parens',
  'no-extra-semi',
  'no-floating-decimal',
  'no-mixed-operators',
  'no-mixed-spaces-and-tabs',
  'no-multi-spaces',
  'no-multiple-empty-lines',
  'no-tabs',
  'no-trailing-spaces',
  'no-whitespace-before-property',
  'nonblock-statement-body-position',
  'object-curly-newline',
  'object-curly-spacing',
  'object-property-newline',
  'one-var-declaration-per-line',
  'operator-linebreak',
  'padded-blocks',
  'padding-line-between-statements',
  'quote-props',
  'quotes',
  'rest-spread-spacing',
  'semi',
  'semi-spacing',
  'semi-style',
  'space-before-blocks',
  'space-before-function-paren',
  'space-in-parens',
  'space-infix-ops',
  'space-unary-ops',
  'spaced-comment',
  'switch-colon-spacing',
  'template-curly-spacing',
  'template-tag-spacing',
  'wrap-iife',
  'wrap-regex',
  'yield-star-spacing',
]

function getRules() {
  const rulesToSkip = []

  const result = filter((_, property) => {
    const found = deprecatedRules.find(x => property === x) !== undefined
    if (found) rulesToSkip.push(property)
    return !found
  }, rules)

  if (rulesToSkip.length > 0) {
    console.log({ rulesToSkip })
  }
  return result
}

exports.rules = getRules()
