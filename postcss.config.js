import autoprefixer from 'autoprefixer';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';

// Setup minimal SCSS-like additions to CSS. Prefer native custom properties
// over preprocessed variables.
// eslint-disable-next-line import/no-default-export
export default {
  plugins: [autoprefixer, postcssMixins, postcssNested],
};
