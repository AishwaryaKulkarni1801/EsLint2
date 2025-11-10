const path = require('path');
const { FlatCompat } = require('@eslint/eslintrc');

// Use FlatCompat to convert shareable configs into flat config entries.
const compat = new FlatCompat({ baseDirectory: __dirname });

// Scope the shareable configs to file types by mapping the compat results to include file patterns.
const tsShared = compat.extends(
  'plugin:@typescript-eslint/recommended',
  'plugin:import/errors',
  'plugin:import/warnings',
  'plugin:import/typescript'
).map((c) => ({ ...c, files: ['**/*.ts'] }));

const htmlShared = compat.extends('plugin:@angular-eslint/template/recommended').map((c) => ({
  ...c,
  files: ['**/*.html'],
}));

module.exports = [
  // ignore patterns (flat config uses 'ignores')
  { ignores: ['node_modules/', 'dist/', 'coverage/', 'src/test/**'] },

  // Settings for import resolver so TypeScript paths (and @angular/*) resolve correctly
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: [path.resolve(__dirname, 'tsconfig.json')],
        },
      },
    },
  },

  // TypeScript shared configs (scoped)
  ...tsShared,

  // TypeScript files - project and specific rules
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: [path.resolve(__dirname, 'tsconfig.json')],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      import: require('eslint-plugin-import'),
    },
    rules: {
      // Treat unused vars as errors to fail CI when present
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Make import order an error in CI
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        },
      ],
    },
  },

  // HTML/shared Angular template configs
  ...htmlShared,
  {
    files: ['**/*.html'],
    plugins: { '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template') },
    rules: {},
  },
];
