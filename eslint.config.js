import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser for all files
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin, // Add TypeScript ESLint plugin explicitly
      react: pluginReact, // Add React plugin explicitly
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Disable this rule for React 17+
      '@typescript-eslint/no-unused-vars': 'warn', // TypeScript rule
      // Add more custom rules as needed
    },
  },
  {
    // JavaScript-specific rules
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      parser: null, // Use default ESLint parser for JS
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Add JS-specific rules directly
    },
  },
  {
    // TypeScript-specific rules
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser, // Ensure parser is set for TypeScript files
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Add TypeScript-specific rules directly
      // Add any additional TypeScript-specific rules
    },
  },
  {
    // React-specific rules
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parser: tsParser, // Ensure parser is set for JSX/TSX files
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact, // Add React plugin explicitly for JSX/TSX files
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Turn off the rule here as well
      ...pluginReact.configs.recommended.rules, // Add React-specific rules directly
    },
  },
];
