import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default [
  ...compat.extends("eslint:recommended"),
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
