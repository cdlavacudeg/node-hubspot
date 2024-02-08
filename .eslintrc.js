module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['models/db/*.js'],
  rules: {
    'no-unused-vars': ['error', { args: 'none' }],
    'consistent-return': ['error'],
  },
};
