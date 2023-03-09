import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// TODO:
// - Create unified target for ES2020 or modern browsers (using browserslist?)
//   for JS and CSS
// - Find out what level Vite compiles to by default
// - Find out how minimal we can make module imports in prod Vite

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
