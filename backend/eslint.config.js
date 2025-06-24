import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,

  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
        ...globals.es2021,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/newline-after-import': ['warn', { count: 1 }],
      'import/no-duplicates': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]);
