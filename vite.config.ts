import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption } from 'vite';

const plugins: PluginOption[] = [react()];

if (process.env.ANALYZE === 'true') {
  plugins.push(
    visualizer({
      brotliSize: true,
      filename: './dist/bundle-analysis.html',
      gzipSize: true,
      open: true,
    }),
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
