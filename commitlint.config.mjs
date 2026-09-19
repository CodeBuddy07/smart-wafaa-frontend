/** @type {import('@commitlint/types').UserConfig} */
const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "landing",
        "ui",
        "tokens",
        "i18n",
        "motion",
        "seo",
        "a11y",
        "ci",
        "deps",
        "release",
        "docs",
        "repo",
      ],
    ],
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
    "body-max-line-length": [1, "always", 120],
  },
};

export default commitlintConfig;
