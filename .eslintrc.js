module.exports = {
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  plugins: ['jest'],
  rules: {
    'no-underscore-dangle': 'off',
    'max-len': ['error', { code: 150 }],
    'brace-style': ['error', 'stroustrup'],
  },
};