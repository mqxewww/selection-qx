import eslintConfigPrettier from "eslint-config-prettier";
import typescriptEslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPluginVue from "eslint-plugin-vue";

export default defineConfig(
  { ignores: ["**/dist/**"] },
  {
    extends: [
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineEmits", "defineProps"],
        },
      ],
    },
  },
  eslintConfigPrettier,
);
