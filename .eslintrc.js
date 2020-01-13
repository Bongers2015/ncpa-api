module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true 
  },
  extends: ['eslint-config-airbnb-base', 'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended'],  
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint','prettier'],
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  rules: {
    'no-unused-vars': ["error", { "varsIgnorePattern": "Service" }],
    'class-methods-use-this': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['.storybook/**', '**/*.stories.*', '**/PageWrapper*']
      }
    ],
    'prefer-destructuring': 0,
    'import/prefer-default-export': 0,
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ]
      }
    ],
    
    'no-shadow': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true
      }
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    // Require PascalCased class and interface names
    '@typescript-eslint/class-name-casing': 'error',
    // Require a specific member delimiter style for interfaces and type literals
    // Default Semicolon style
    // '@typescript-eslint/member-delimiter-style': 'error',
    // Require a consistent member declaration order
    '@typescript-eslint/member-ordering': 'error',
    // Require consistent spacing around type annotations
    '@typescript-eslint/type-annotation-spacing': 'error'
  }
};
