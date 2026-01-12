/* eslint-disable import-x/no-extraneous-dependencies */
import unusedImports from 'eslint-plugin-unused-imports';
import perfectionist from 'eslint-plugin-perfectionist';
import reactHooks from 'eslint-plugin-react-hooks';
import importX from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import globals from 'globals';
import js from '@eslint/js';

const ERROR = 'error';
const OFF = 'off';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.wireit/**', 'typecheck-dist/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...perfectionist.configs['recommended-alphabetical'].rules,
      ...perfectionist.configs['recommended-natural'].rules,
      ...perfectionist.configs['recommended-line-length'].rules,

      '@typescript-eslint/no-unused-vars': [ERROR, { ignoreRestSiblings: false, args: 'after-used', vars: 'all' }],
      '@typescript-eslint/consistent-type-imports': [ERROR, { fixStyle: 'separate-type-imports' }],
      'import-x/no-extraneous-dependencies': [ERROR, { devDependencies: false }],

      'import-x/consistent-type-specifier-style': [ERROR, 'prefer-top-level'],
      '@typescript-eslint/no-unsafe-declaration-merging': ERROR,
      'unused-imports/no-unused-imports': ERROR,
      'react/jsx-no-useless-fragment': ERROR,

      'react/no-unescaped-entities': OFF,

      'import-x/no-duplicates': ERROR,
      'react/react-in-jsx-scope': OFF,
      'import-x/first': ERROR,

      'no-unreachable': ERROR,
      'require-await': ERROR,
      'no-eval': ERROR
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        tsconfigRootDir: import.meta.dirname,
        projectService: true
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      'unused-imports': unusedImports,
      'react-hooks': reactHooks,
      'import-x': importX,
      perfectionist,
      react
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    rules: {
      'import-x/no-extraneous-dependencies': [ERROR, { devDependencies: true }]
    },
    files: ['vitest.config.ts', '**/*.test.ts', '**/*.test.tsx', '**/*.test-d.ts']
  }
] as const;
