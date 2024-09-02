export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  overrides: [
    {
      files: "*.html",
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.jsx', '*.tsx'],
      options: {
        singleQuote: true, // Single quotes for JS in JSX/TSX
        jsxSingleQuote: false, // Double quotes for JSX attributes
      },
    },
  ],
};
