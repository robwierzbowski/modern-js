# Modern-js

Constructing a modern 2023+ JS build pipeline.

## Installation

```sh
npm install
```

## Usage

Develop in `src/` using [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) and [PostCSS](https://postcss.org/) with [nesting](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting) and [mixins](https://github.com/postcss/postcss-mixins). Use VSCode integrations for [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), and [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) to add author-time formatting and hints.

### Scripts

#### `npm run dev`

Start the app in local development mode.

#### `npm run build`

Build the application into deployable assets. Lints, typechecks, and tests must pass to `build`.

#### `npm run lint:js`

Enforce a consistent style and quality level in JavaScript with [ESLint](https://eslint.org/).

#### `npm run lint:css`

Enforce a consistent style and quality level in CSS with [Stylelint](https://stylelint.io/).

#### `npm run test`

Run local tests with [Vitest](https://vitest.dev/)

#### `npm run analyze`

Generate an interactive visualization of the bundle composition and size using [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer).

## Technology choices and notes

An ongoing list of projects tested and what I'm learning about them.

### Build framework: Vite ✅ vs Webpack vs Turbopack

- Vite is a lot closer to Webpack than I thought it would be. Plenty of magic going on under the hood, a decent sized ecosystem of plugins.
- A main goal with this repo will be to output the most modern built files possible, avoiding transpilation of any 2020+ browser acceptable code. Preferably ES module imports, dynamic imports, native async/await, etc.
- Vite uses rollup and rollup plugins under the hood! Finally my boy rollup in the spotlight 🙌🏼.
- Vite manages the root-level index.html, just like Webpack. This file is used for dev serving, and it's altered and copied to `dist/` when running `build`.
- Vite and EsBuild prefer to use the `.jsx` extension to apply jsx transforms. We're using `.tsx` files here, but worth noting that the ~2017+ best practice of calling all files JS, whether they have JSX in them or not, is now outdated.

### JS Transpilation: Babel vs EsBuild ✅ vs SWC

- Looks like the [Vite config](https://vitejs.dev/config/build-options.html) exposes most of the ESBuild transpilation and compilation options, including target browser support!
- Vite handles SWC internally, without settings exposed. SWC's default behavior is to target ES5 (awful for performance), but from what I gather from the react-swc plugin source, Vite configures SWC to target ES2020.
- **The React-swc plugin only "Replaces Babel with SWC during development".** "During builds, SWC+esbuild are used when using plugins, and esbuild only otherwise". I prefer to minimize the number of tools doing a single job to make config and debugging easier, so ESBuild seems like a better choice. [Some tweets from Evan](https://twitter.com/youyuxi/status/1586042491739860993) point to SWC being the eventual default, but only for very large projects (1000s or 10000s of files).
- ESBuild with Jest is much less mature. I hacked it together but ran into some issues with css modules and RTL user event imports that required workarounds. Might contrib to `jest-esbuild-transform` to get plugins (css modules) working for Jest transforms **Edit:** After further exploration, it's not immediately solvable. Documentation around create-a-transformer are also light / lacking. I'm going to sidestep the issue by switching to the Vite-centric Vitest.

### Types: TypeScript ✅

- Note that with Vite, we run `tsc` with `no-emit` for author and compile time type checking, and use EsBuild to transpile the TS into JavaScript.
- In order to use TS for config files, we need to configure the CLI and the editor (VS Code) to use an executor that understands TS without compilation (i.e., [ts-node](https://github.com/TypeStrong/ts-node)). That's one step too far for me right now, so config files will remain in JS.

### Styling: SCSS vs PostCSS ✅ vs vanilla CSS

- Vite is using PostCSS for `@import`s by default. We have access to a PostCSS config to add autoprefixing and some additional niceties like nesting and mixins.
- No need for other CSS precompiler features (variables or functions). Modern CSS is the 🐝's 🦵🏼.
- Vite handles CSS url/import resolution.
- Advanced functionality: Looks like the `?inline` loader/query param doesn't work with Vite's `NodeNext` imports enabled. See this guide for more info on code splitting: https://vitejs.dev/guide/features.html#css-code-splitting. EDIT: This has become a moot point as I've had to revert to vite `node` imports to support npm module `*.d.ts` resolution.

### Testing: Jest vs node-test-runner vs Ava vs Vitest ✅

- There's a [new test runner native to node](https://glebbahmutov.com/blog/trying-node-test-runner/), but I don't think it's ready for wide usage. The ecosystem is thin, and the failed test output is not as descriptive as other options.
- Ava is focused on node and functional ES code; Jest and related are a better fit for a mix of node and DOM testing.
- Jest: the first package that comes up when you search Jest and ESBuild is abandoned, but there's a very light Jest transformer wrapper at https://github.com/AkifumiSato/esbuild-jest-transform. ESBuild options are pass through and ESBuild is a peer dependency. Ideal!
- BUT, due to Jest usually running transformers in sync mode, we can't use plugins like css-modules in esbuild-jest-transform. I hacked at esbuild-jest-transform for a bit, but wasn't able to trigger an `asyncProcess` transform. I think it might have to do with how Jest chooses whether a .js file is an ES or common-style module. References: https://github.com/AkifumiSato/esbuild-jest-transform/issues/7, https://jestjs.io/docs/code-transformation, https://github.com/evanw/esbuild/issues/2821, https://github.com/kulshekhar/ts-jest/blob/main/src/legacy/ts-jest-transformer.ts
- [Vitest](https://vitest.dev/) looks interesting — it's got the great benefit of using Vite build/plugins in the exact same configuration as production builds. It's young and doesn't seem as focused or clearly documented as Jest, but it's worth trying just for the consistency of code transformations. **Edit:** Adding it was pleasant! Let's do it!

### React/DOM testing: React Testing Library ✅

- Is there any alternative? At this time I don't think so.

### Additional notes

- [https://browserslist.dev/](https://browserslist.dev/) is a nice little resource for visualizing browserslist query results.
- Big thanks to Mehdi M. for writing [this very clear article](https://dev.to/meduzen/when-vite-ignores-your-browserslist-configuration-3hoe) on getting browserslist and EsBuild working together.
- Rollup has a bundle analyzer too! It's less pretty than webpack's, but still very nice to have around.
