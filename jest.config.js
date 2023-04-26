const testFileRegex = '\\.test\\.(j|t)sx?$';
const transformFileRegex = '\\.(j|t)sx?$';

const config = {
  clearMocks: true,
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    './src/test/loadTestingLibrary.ts',
    './src/test/requireAssertions.ts',
  ],
  testEnvironment: 'jest-environment-jsdom-global',
  testRegex: testFileRegex,
  transform: {
    [transformFileRegex]: [
      'esbuild-jest-transform',
      {
        jsx: 'automatic',
        loader: {
          // Ideally we'd use the esbuild css modules plugin to align with Vite,
          // but esbuild requires async mode to use plugins, and this
          // transformer uses sync mode. For the time being, we'll discard CSS
          // imports in tests. Reference:
          // https://github.com/AkifumiSato/esbuild-jest-transform/issues/7
          '.css': 'empty',
        },
        sourcemap: true,
      },
    ],
  },
  verbose: true,
};

// eslint-disable-next-line import/no-default-export
export default config;
