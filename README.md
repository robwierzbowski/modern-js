# Modern-js

Playing around with a 2023+ JS build pipeline.

## Installation

```sh
npm install
```

## Usage

Develop in `src/` using [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) and [PostCSS](https://postcss.org/) with [nesting](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting) and [mixins](https://github.com/postcss/postcss-mixins). Use VSCode integrations for [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), and [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) to add author-time formatting and hints.

### Scripts

#### `npm run dev`

Starts the app in local development mode.

#### `npm run build`

Builds the application into deployable assets. Lints, typechecks, and tests must pass to `build`.

#### `npm run lint:js`

Enforces a consistent style and quality level in JavaScript with [ESLint](https://eslint.org/).

#### `npm run lint:css`

Enforces a consistent style and quality level in CSS with [Stylelint](https://stylelint.io/).

#### `npm run test`

Runs local tests with [Vitest](https://vitest.dev/)

#### `npm run analyze`

Generates an interactive visualization of the bundle composition and size using [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer).

## Technology choices and notes

Ongoing notes to keep track of what I'm learning.

### Vite ✅ vs EsBuild vs Turbopack

- Vite is a lot closer to Webpack than I thought it would be. Plenty of magic going on under the hood.
- A main goal with this repo will be to output the most modern built files possible, avoiding transpilation of any 2020+ browser acceptable code. Preferably ES module imports, dynamic imports, native async/await, etc.
- Vite uses rollup and rollup plugins under the hood! Finally my boi rollup in the spotlight 🙌🏼.
- Vite manages the root-level index.html, just like Webpack. This file is used for dev serving, and it's altered and copied to `dist/` when running `build`.
- Vite and EsBuild prefer to use the `.jsx` extension to apply jsx transforms. We're using `.tsx` files here, but worth noting that the ~2017+ best practice of calling all files JS, whether they have JSX in them or not, is now outdated.

### Babel vs EsBuild ✅ vs SWC

- Looks like the [Vite config](https://vitejs.dev/config/build-options.html) exposes most of the ESBuild transpilation and compilation options, including target browser support!
- Seems like Vite handles SWC internally when installed. SWC's default behavior is to target ES5, which is awful for perf in modern browsers. From what I gather from Vite's react-swc plugin source, Vite configures it to target ES2020. I assume that includes dynamic imports, which are a big reason I'm interested in Vite. I want to live the dream of coding and loading with untranspiled ES6 modules.
- **The React-swc plugin only "Replaces Babel with SWC during development.** "During builds, SWC+esbuild are used when using plugins, and esbuild only otherwise". I prefer to minimize the number of tools doing a single job to make config and debugging easier. [Some tweets from Evan](https://twitter.com/youyuxi/status/1586042491739860993) point to SWC being the eventual default, but only for v big projects. EsBuild it is!
- ESBuild with Jest is much less mature. I hacked it together but ran into some issues with css modules and RTL user event default imports that required some workarounds. Might contrib to `jest-esbuild-transform` to get plugins (css modules) working for Jest transforms **Edit:** I did some exploration, but it's not immediately solvable and the create-a-transformer docs are light. I'm going to switch to the Vite-centric Vitest.

### TypeScript

- Note in this repo we're no-emitting when runing `tsc`, and using EsBuild to transpile the TS during dev and build.
- In order to use TS for config files, we need to configure the CLI and the editor (VS Code) to use an executor that understands TS files without compilation (i.e., [ts-node](https://github.com/TypeStrong/ts-node)). That's one step too far for me right now, so settings files will remain in JS.

### SCSS vs CSS vs PostCSS ✅

- Vite is using PostCSS for `@import`s. We have access to a PostCSS config to add autoprefixing and some additional niceties like nesting and maybe mixins.
- No need for other CSS precompiler features (vars, funcs). Modern CSS is the 🐝's 🦵🏼.
- Vite handles CSS url/import resolution. They call path resolution "rebasing" which although correct sounds a bit weird/overloaded.
- Looks like the `?inline` loader/query param doesn't work with `NodeNext` imports enabled. See this guide for more info on code splitting: https://vitejs.dev/guide/features.html#css-code-splitting. This is a moot point as I've had to revert to vite `node` imports to support installed dependency `*.d.ts` file resolution.

### Jest vs node-test-runner vs Ava vs Vitest ✅

- There's a [new test runner native to node](https://glebbahmutov.com/blog/trying-node-test-runner/), but I don't think it's ready for wide usage. The community support with linters, etc. and the failed test output is not on par with existing options.
- Ava is pretty focused on node and functional ES code; Jest and related are a better fit for node and DOM testing.
- The first package that comes up when you search Jest and ESBuild is abandoned, but there's a very light Jest transformer wrapper at https://github.com/AkifumiSato/esbuild-jest-transform. ESB options are pass through and ESB is a peer dependency, exactly what I want.
- BUT, due to Jest usually running transformers in sync mode, we can't use plugins like css-modules in esbuild-jest-transform. I hacked at esbuild-jest-transform for a bit, but wasn't able to trigger an `asyncProcess` transform. I think it might have to do with how Jest chooses whether a .js file is an ES or common-style module. References: https://github.com/AkifumiSato/esbuild-jest-transform/issues/7, https://jestjs.io/docs/code-transformation, https://github.com/evanw/esbuild/issues/2821, https://github.com/kulshekhar/ts-jest/blob/main/src/legacy/ts-jest-transformer.ts
- [Vitest](https://vitest.dev/) looks interesting — it's got a great benefit of using the same Vite build/plugins as the prod site for testing. It's young and doesn't seem as focused as Jest, or as clearly documented, but it might be worth trying just for the consistency of code transformations being the same in test and production. **Edit:** Adding it was pleasant! Let's do it!

### React Testing Library

- Is there any alternative? At this time I don't think so.

### Etc.

- [https://browserslist.dev/](https://browserslist.dev/) is a nice little resource for visualizing browserslist query results.
- Big thanks to Mehdi M. for writing [this very clear article](https://dev.to/meduzen/when-vite-ignores-your-browserslist-configuration-3hoe) on getting browserslist and EsBuild working together.
- Run `npm run analyze` to see Rollup's bundle analyzer. It's less pretty than webpack's, but it's still nice to have around.
