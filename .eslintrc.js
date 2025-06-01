module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier', // Must be last
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    // Disable rules that conflict with Prettier
    'react-native/no-inline-styles': 'off',
  },
}
