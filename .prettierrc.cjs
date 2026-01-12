// @ts-check

/** @type {import("prettier").Config} */
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/App.css',
  bracketSameLine: false,
  trailingComma: 'none',
  bracketSpacing: true,
  proseWrap: 'always',
  singleQuote: true,
  printWidth: 150,
  useTabs: false,
  tabWidth: 2,
  semi: true
};
