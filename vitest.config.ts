import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    clearMocks: true,
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.js',
    watch: false,
  },
});

// eslint-disable-next-line import/no-default-export
export default config;
