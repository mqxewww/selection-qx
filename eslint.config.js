import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config(
  {
    ignores: [
      "**/assets/components/ui/**",
      "**/bin/**",
      "**/config/**",
      "**/migrations/**",
      "**/node_modules/**",
      "**/public/**",
      "**/src/**",
      "**/templates/**",
      "**/var/**",
      "**/vendor/**",
    ],
  },
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
  eslintConfigPrettier
);
