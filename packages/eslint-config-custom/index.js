module.exports = {
  extends: ["next", "turbo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "import/no-extraneous-dependencies": "error",
    "prettier/prettier": "error",
    "react/no-unescaped-entities": "off",
  },
};
