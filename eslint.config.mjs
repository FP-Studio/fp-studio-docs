import globals from 'globals';
import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import { config, configs } from 'typescript-eslint';
import { configs as hooksConfigs } from 'eslint-plugin-react-hooks';
import { flatConfigs as importConfigs } from 'eslint-plugin-import-x';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default config([
  eslint.configs.recommended,
  ...configs.recommended,
  importConfigs.recommended,
  importConfigs.typescript,
  hooksConfigs['recommended-latest'],
  {
    plugins: {
      react: reactPlugin
    },
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/jsx-uses-react': 0,
      'react/jsx-sort-props': 2,
      'react/react-in-jsx-scope': 0,
      'import-x/no-unresolved': 0
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['webpack.config.*'],
    languageOptions: {
      globals: globals.node
    }
  },
  eslintPluginPrettier
]);
