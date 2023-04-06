import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'vite';

// TODO:
// - Find out how minimal and modern we can get production Vite

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react()],
  build: {
    target: browserslistToEsbuild(),
  },
});
