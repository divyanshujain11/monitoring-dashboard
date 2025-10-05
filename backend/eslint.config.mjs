import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: true,
});

export default [
  ...compat.config({
    env: {
      node: true,       // enable Node globals like require, module
      es2021: true,
    },
    rules: {
      // you can add custom rules here
    },
  }),
];
