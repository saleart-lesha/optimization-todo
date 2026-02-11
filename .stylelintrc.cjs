module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],

  rules: {
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-pattern': /^[a-z]+([A-Z][a-z]+)*$|^_[a-z]+([A-Z][a-z]+)*$/,
    'scss/percent-placeholder-pattern': /^[a-z]+([A-Z][a-z]+)*$/,
    'no-descending-specificity': null,
    'declaration-no-important': true,
    'selector-class-pattern': null,
  },

  ignoreFiles: ['dist/**', 'node_modules/**', '**/*.js', '**/*.ts', '**/*.tsx'],
};
