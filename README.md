# Modern-js

Playing around with a 2023+ JS build pipeline.

## Working notes

##### Vite ✅ vs EsBuild vs Turbopack

- Vite is a lot closer to Webpack than I thought it would be. Plenty of magic going on under the hood.
- A main goal with this repo will be to set it up to output the most modern built files possible, avoiding transpilation of any 2020+ browser acceptable code. No auto default imports, preferably ES module imports w/out concatenation, dynamic imports, native async/await, etc.
- Vite uses rollup and rollup plugins under the hood! Finally my boi rollup in the spotlight 🙌🏼

##### Babel vs EsBuild vs SWC ✅

- Seems like Vite exposes TS config, but handles SWC internally. SWC's default behavior is to target ES5, which is awful for perf in modern browsers. From what I gather from Vite's react-swc plugin source, Vite is targeting ES2020. I assume that includes dynamic imports, which are a big reason I'm interested in Vite. I want to live the dream of coding and loading with untranspiled ES6 modules.
- Looks like the [Vite config](https://vitejs.dev/config/build-options.html) exposes most of the transpilation and compilation options, including target and browser support!

##### TypeScript

- Kinda odd that TS manages JSON import loading. I guess it's ok, but it's yet another place you might configure a JSON file loader (more common being a bundler loader a la webpack). It would be great to just have this in ECMAScript and be done with it.
- OHHHH, we're no-emitting, and I'm guessing using SWC transpile the TS. I wonder if SWC is somehow reading the TS config, or if the TS config is just for editor / linter checking. If so, changing the rules without changing the underlying SWC config will create unexpected output.

###### CSS

- Vite is using PostCSS for `@import`s. Do we have access to a PostCSS config to manage autoprefixing and some additional niceties like nesting and maybe mixins? Edit: they do!
- Vite handles CSS url/import resolution. They keep calling path resolution "rebasing" which although may be correct sounds very weird.
- No need for other CSS precompiler features (vars, funcs). Modern CSS is the 🐝's 🦵🏼.
- Looks like the `?inline` loader/query param doesn't work with NodeNext imports enabled. Right now my modules are being injected in HEAD -- check if they're extracted in build. _Edit_: well, there's my answer: https://vitejs.dev/guide/features.html#css-code-splitting
