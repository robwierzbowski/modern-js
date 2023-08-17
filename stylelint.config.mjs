// TODO: Expand stylelint rules and potentially extract similar to eslint-robbnb

const coreRules = {
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
  'selector-pseudo-class-no-unknown': [
    true,
    {
      // Allow CSS module's :global pseudo class
      ignorePseudoClasses: ['global'],
    },
  ],
};

const cssModulesRules = {
  'css-modules/composed-class-names': true,
  'css-modules/css-variables': true,
};

const highPerformanceAnimationRules = {
  'plugin/no-low-performance-animation-properties': true,
};

// This should be a great way to prevent unused cruft in CSS files, but I'm
// curious to see how well it works. The relationships that need to be
// documented are pretty complex.
const noIgnoredPropertiesRules = {
  'plugin/declaration-block-no-ignored-properties': true,
};

const useNestingRules = {
  'csstools/use-nesting': true,
};

const config = {
  customSyntax: 'postcss',
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['dist/**'],
  plugins: [
    'stylelint-css-modules',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-high-performance-animation',
    'stylelint-use-nesting',
  ],
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,

  rules: {
    ...coreRules,
    ...cssModulesRules,
    ...highPerformanceAnimationRules,
    ...noIgnoredPropertiesRules,
    ...useNestingRules,
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
