// eslint.config.js

import { createRequire } from "module";
import esParser from "@typescript-eslint/parser";

const require = createRequire(import.meta.url);

export default [
  {
    files: ["**/*.ts", "**/*.tsx"], // Apply to TypeScript files
    ignores: ["node_modules", "dist"], // Directories to ignore
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript features
      sourceType: "module", // Use ECMAScript modules
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"), // TypeScript plugin
    },
    languageOptions: {
      parser: esParser,
    },
    rules: {
      semi: ["error", "always"], // Example rule: enforce semicolons
      quotes: ["error", "single"], // Example rule: enforce single quotes
      // Add more custom rules as needed
    },
  },
];
