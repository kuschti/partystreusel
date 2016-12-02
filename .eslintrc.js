module.exports = {
  extends: 'airbnb',
  plugins: [
    'import',
  ],
  env: {
    browser: true,
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true} ],
  },
}
