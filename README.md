# Modern-js

Playing around with a 2023+ JS build pipeline.

## Tools bein thrown around, and notes on them

**Vite** vs EsBuild vs Turbopack

Babel vs **SWC**

- Seems like Vite exposes TS config, but handles SWC internally. SWC's default behavior is to target ES5, which is awful for perf in modern browsers. From what I gather from Vite's react-swc plugin source, Vite is targeting ES2020. I assume that includes dynamic imports, which are a big reason I'm interested in Vite. I want to live the dream of coding and loading with untranspiled ES6 modules.

TypeScript

- Kinda odd that TS manages JSON import loading. I guess it's ok, but it's yet another place you might configure a JSON file loader (more common being a bundler loader a la webpack). It would be great to just have this in ECMAScript and be done with it.
- OHHHH, we're no-emitting, and letting SWC transpile the TS I suppose. I wonder if SWC is somehow reading the TS config, or if it's just for editor / linter time checking. If so, changing the rules without changing the underlying SWC config will be confusing / useless.

CSS

- Vite is using PostCSS for `@import`s. Do we have access to a PostCSS config to manage autoprefixing and some additional niceties like nesting and maybe mixins? Edit: they do!
- Vite handles CSS url/import resolution. They keep calling path resolution "rebasing" which although may be correct sounds very weird.
- No need for other CSS precompiler features (vars, funcs). Modern CSS is the 🐝's 🦵🏼.
