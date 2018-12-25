module.exports = {
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:react/recommended',
  ],
  env: {
    'browser': true,
    'es6': true,
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  plugins: [
    'jest',
    'react'
  ],
  rules: {
    'no-underscore-dangle': 'off',
    'max-len': ['error', { code: 150 }],
    'brace-style': ['error', 'stroustrup'],
    "react/prop-types": 0,
  },
  settings: {
    react: {
      version: '16.7',
    },
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx"
        ],
      },
    },
  },
};