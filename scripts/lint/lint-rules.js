const { filter } = require('rambdax')
const {
  configs: {
    'recommended-alphabetical': { rules: perfectionistRulesImport },
  },
} = require('eslint-plugin-perfectionist')

function getPerfectionistRules() {
  let rules = {}
  Object.keys(perfectionistRulesImport).forEach((key) => {
    rules[key] = [1, ...perfectionistRulesImport[key].slice(1)]
  })
  return rules
}

const perfectionistRules = getPerfectionistRules()

const rules = {
  ...perfectionistRules,
  '@typescript-eslint/array-type': [
    1,
    {
      default: 'array',
    },
  ],
  '@typescript-eslint/brace-style': [
    1,
    '1tbs',
    {
      allowSingleLine: true,
    },
  ],
  '@typescript-eslint/comma-spacing': [
    1,
    {
      after: true,
      before: false,
    },
  ],
  '@typescript-eslint/consistent-type-assertions': 0,
  '@typescript-eslint/consistent-type-definitions': [1, 'interface'],
  '@typescript-eslint/explicit-module-boundary-types': 0,
  '@typescript-eslint/func-call-spacing': [1, 'never'],
  '@typescript-eslint/indent': [1, 2],
  '@typescript-eslint/member-delimiter-style': [
    1,
    {
      multiline: {
        delimiter: 'comma',
      },
      singleline: {
        delimiter: 'comma',
      },
    },
  ],
  '@typescript-eslint/no-array-constructor': 1,
  '@typescript-eslint/no-confusing-void-expression': 0,
  '@typescript-eslint/no-empty-function': 0,
  '@typescript-eslint/no-empty-interface': 1,
  '@typescript-eslint/no-explicit-any': 1,
  '@typescript-eslint/no-extra-non-null-assertion': 1,
  '@typescript-eslint/no-extra-parens': 1,
  '@typescript-eslint/no-floating-promises': 0,
  '@typescript-eslint/no-non-null-assertion': 0,
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
  '@typescript-eslint/no-unnecessary-condition': 0,
  '@typescript-eslint/no-unnecessary-type-arguments': 1,
  '@typescript-eslint/no-unnecessary-type-assertion': 1,
  '@typescript-eslint/no-unnecessary-type-constraint': 1,
  '@typescript-eslint/no-unsafe-argument': 0,
  '@typescript-eslint/no-unsafe-assignment': 0,
  '@typescript-eslint/no-unsafe-call': 0,
  '@typescript-eslint/no-unsafe-member-access': 0,
  '@typescript-eslint/no-unsafe-return': 0,
  '@typescript-eslint/no-unused-vars': [
    0,
    {
      argsIgnorePattern: '^_$',
      varsIgnorePattern: '^_$',
    },
  ],
  '@typescript-eslint/no-use-before-define': 2,
  '@typescript-eslint/non-nullable-type-assertion-style': 1,
  '@typescript-eslint/prefer-as-const': 1,
  '@typescript-eslint/prefer-function-type': 1,
  '@typescript-eslint/prefer-includes': 1,
  '@typescript-eslint/prefer-nullish-coalescing': [
    0,
    {
      forceSuggestionFixer: true,
      ignoreConditionalTests: true,
      ignoreMixedLogicalExpressions: true,
    },
  ],
  '@typescript-eslint/prefer-optional-chain': 0,
  '@typescript-eslint/prefer-string-starts-ends-with': 1,
  '@typescript-eslint/require-await': 2,
  '@typescript-eslint/restrict-template-expressions': 0,
  '@typescript-eslint/type-annotation-spacing': 1,
  'no-prototype-builtins': 0,
  'no-undef': 0,
  'no-unused-vars': 0,
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
  let rulesToSkip = []

  // console.log({rulesToSkip})
  return filter((_, property) => {
    let found = deprecatedRules.find((x) => property.includes(x)) !== undefined
    if (found) rulesToSkip.push(property)
    return !found && !property.startsWith('@typescript-eslint')
  }, rules)
}

exports.rules = getRules()
