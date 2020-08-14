module.exports = {
  extends: [],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prefer-const': 2,
    'no-var': 2,
    'no-multiple-empty-lines': 2,
    'lines-between-class-members': ['error', 'always'],
  },
  settings: {},
  env: {
    browser: true,
  },
};
