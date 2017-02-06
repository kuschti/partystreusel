module.exports = {
  extends: 'airbnb-base',
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
