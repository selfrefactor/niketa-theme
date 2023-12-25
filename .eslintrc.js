const { rules } = require('./scripts/lint/lint-rules');

module.exports = {
  plugins: [
    '@stylistic',
    'sonarjs',
    'unused-imports',
    'perfectionist',
  ],
  extends: [
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:@stylistic/recommended-extends'
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules,
};
