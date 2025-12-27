// @ts-check

import eslint from '@eslint/js';
import vitestPlugin from '@vitest/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  vitestPlugin.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs.flat.recommended,
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js', 'vite.config.ts'],
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      vitest: {
        typecheck: true,
      },
    },
    rules: {
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: true,
        },
      ],
      'vitest/expect-expect': 'off',
      'vitest/no-focused-tests': 'off',
      'no-restricted-imports': [
        'warn',
        {
          paths: [
            {
              name: 'react-redux',
              importNames: ['useSelector', 'useStore', 'useDispatch'],
              message: 'Please use pre-typed versions from `src/app/hooks.ts` instead.',
            },
          ],
        },
      ],
    },
  }
);
