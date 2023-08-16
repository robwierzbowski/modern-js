// TODO: Expand stylelint rules and potentially extract similar to eslint-robbnb

const config = {
  customSyntax: 'postcss',
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['dist/**'],
  plugins: ['stylelint-css-modules'],
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,

  rules: {
    'at-rule-no-unknown': [
      true,
      {
        // Allow postcss-mixin's mixin's at-rules
        // TODO: Write a plugin that checks for correct usage of the keywords,
        // similar to stylelint-scss. It looks like that doesn't exist
        // currently:
        // https://github.com/stylelint/stylelint/issues/2600#issuecomment-304978387
        ignoreAtRules: ['define-mixin', 'mixin'],
      },
    ],
    'css-modules/composed-class-names': true,
    'css-modules/css-variables': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        // Allow CSS module's :global pseudo class
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
