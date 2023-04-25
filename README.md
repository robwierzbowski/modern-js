# Modern-js

Playing around with a 2023+ JS build pipeline.

## Technology choices and notes

### Vite ✅ vs EsBuild vs Turbopack

- Vite is a lot closer to Webpack than I thought it would be. Plenty of magic going on under the hood.
- A main goal with this repo will be to output the most modern built files possible, avoiding transpilation of any 2020+ browser acceptable code. Preferably ES module imports, dynamic imports, native async/await, etc.
- Vite uses rollup and rollup plugins under the hood! Finally my boi rollup in the spotlight 🙌🏼.
- Vite manages the root-level index.html, just like Webpack. This file is used for dev serving, and it's altered and copied to `dist/` when running `build`.
- Vite and EsBuild prefer to use the `.jsx` extension to apply jsx transforms. We're using `.tsx` files here, but worth noting that the ~2017+ best practice of calling all files JS whether they have JSX in them or not is now outdated supported.

### Babel vs EsBuild ✅ vs SWC

- Looks like the [Vite config](https://vitejs.dev/config/build-options.html) exposes most of the transpilation and compilation options, including target and browser support!
- Seems like Vite handles SWC internally. SWC's default behavior is to target ES5, which is awful for perf in modern browsers. From what I gather from Vite's react-swc plugin source, Vite is targeting ES2020. I assume that includes dynamic imports, which are a big reason I'm interested in Vite. I want to live the dream of coding and loading with untranspiled ES6 modules.
- **The React-swc plugin only "Replaces Babel with SWC during development.** "During builds, SWC+esbuild are used when using plugins, and esbuild only otherwise". I prefer to minimize the number of tools doing a single job to make config and debugging easier. [Some tweets from Evan](https://twitter.com/youyuxi/status/1586042491739860993) point to SWC being the eventual default, but only for v big projects. EsBuild it is!

### TypeScript

- Note in this repo we're no-emitting, and using EsBuild to transpile the TS during dev and build.
- In order to use TS for Vite and ESLint config files, we need to configure the CLI and the editor (VS Code) to use an executor that understands TS files without compilation, like [ts-node](https://github.com/TypeStrong/ts-node). That's one step too far for me right now, so settings files will remain in JS.

### SCSS vs CSS vs PostCSS ✅

- Vite is using PostCSS for `@import`s. We have access to a PostCSS config to manage autoprefixing and some additional niceties like nesting and maybe mixins.
- No need for other CSS precompiler features (vars, funcs). Modern CSS is the 🐝's 🦵🏼.
- Vite handles CSS url/import resolution. They call path resolution "rebasing" which although correct sounds a bit weird/overloaded.
- Looks like the `?inline` loader/query param doesn't work with `NodeNext` imports enabled. See this guide for more info on code splitting: https://vitejs.dev/guide/features.html#css-code-splitting. This is a moot point as I've had to revert to vite `node` imports to support dependency `*.d.ts` file resolution.

### Jest ✅ vs node-test-runner vs Ava

- There's a [new test runner native to node](https://glebbahmutov.com/blog/trying-node-test-runner/), but I don't think it's ready for wide usage. Aside from the lack of community support with linters, etc. due to newness, the failed test output is not on par with existing options.
- We could look at Ava again. I'm thinking Jest is probably best for familiarity and market share.
- The first package that comes up when you search Jest and ESBuild is abandoned, but there's a very light Jest transformer wrapper at https://github.com/AkifumiSato/esbuild-jest-transform that works great. ESB options are pass through and ESB is a peer dependency, exactly what I want.
- TODO:
  - [ ] Add jest and RTL lints
  - [ ] Add some user event tests with RTL
  - [ ] Should we preemptively mock window.matchmedia, fetch, window.location, and intersection observer?
  - [ ] Should we require at least one assertion per test?
  - [ ] Should we fail on console expressions?
  - [ ] Should we add jest-axe?

### React Testing Library

- Is there any alternative? At this time I don't think so.

### Etc.

- [https://browserslist.dev/](https://browserslist.dev/) is a nice little resource for visualizing browserslist query results.
- Big thanks to Mehdi M. for writing [this very clear article](https://dev.to/meduzen/when-vite-ignores-your-browserslist-configuration-3hoe) on getting browserslist and EsBuild working together.
- Run `ANALYZE=true npm run build` to see Rollup's bundle analyzer. It's less pretty than webpack's, but it's still nice to have around.
