import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption } from 'vite';

const plugins: PluginOption[] = [react()];

if (process.env.ANALYZE === 'true') {
  plugins.push(
    // Rollup plugin visualizer suggests type coercion in their docs. Not
    // pretty, but for now it's ok.
    // https://github.com/btd/rollup-plugin-visualizer
    visualizer({
      brotliSize: true,
      filename: './dist/bundle-analysis.html',
      gzipSize: true,
      open: true,
    }) as unknown as PluginOption,
  );
}

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins,
  build: {
    target: browserslistToEsbuild(),
  },
});
