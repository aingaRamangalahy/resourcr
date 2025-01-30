module.exports = {
  root: true,
  env: {
    browser: true, // For frontend (Nuxt)
    node: true, // For backend (Node.js)
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier", "unused-imports"],
  rules: {
    "prettier/prettier": "error",
    "unused-imports/no-unused-imports": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      // Nuxt Frontend (Vue 3)
      files: ["apps/frontend/**/*.{vue,ts,js}"],
      extends: ["plugin:vue/vue3-recommended", "@nuxt/eslint-config"],
      rules: {
        "vue/multi-word-component-names": "off", // Allow single-word component names
      },
    },
    {
      // Node.js Backend
      files: ["apps/backend/**/*.ts"],
      extends: ["plugin:node/recommended"],
      rules: {
        "node/no-unsupported-features/es-syntax": "off",
      },
    },
  ],
};
