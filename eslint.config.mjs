import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

const ignores = [
  ".next/**",
  "next-env.d.ts",
  "node_modules/**",
  "out/**"
];

const eslintConfig = [
  { ignores },
  ...compat.extends("next/core-web-vitals", "next/typescript")
];

export default eslintConfig;
