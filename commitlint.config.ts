/* eslint-env node */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [2, "never"],
    "scope-empty": [0, "always"],
    "subject-case": [0], // Disable subject case validation
    // "header-match": [2, "always", /^(feat|fix|docs|...): #\d+ .*/],
    "header-min-length": [2, "always", 10],
    "header-max-length": [2, "always", 72],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
  },
};
