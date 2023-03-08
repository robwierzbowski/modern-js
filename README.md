# Modern-js

Playing around with a 2023+ JS build pipeline.

## Tools bein thrown around

**Vite** vs EsBuild vs Turbopack

Babel vs **SWC**

- Seems like Vite exposes TS config, but handles SWC internally. SWC's default behavior is to target ES5, which is awful for perf in modern browsers. From what I gather from Vite's react-swc plugin source, Vite is targeting ES2020. I assume that includes dynamic imports, which are a big reason I'm interested in Vite. I want to live the dream of coding and loading with untranspiled ES6 modules.
