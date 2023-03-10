import { defineConfig } from 'vite';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import react from '@vitejs/plugin-react';

// TODO:
// - Find out how minimal and modern we can get production Vite

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: browserslistToEsbuild(),
  },
});
