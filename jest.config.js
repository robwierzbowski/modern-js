const testFileRegex = '\\.test\\.(j|t)sx?$';

const config = {
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  testEnvironment: 'jest-environment-jsdom-global',
  testRegex: testFileRegex,
  transform: {
    [testFileRegex]: [
      'esbuild-jest-transform',
      {
        jsx: 'automatic',
        sourcemap: true,
      },
    ],
  },
  verbose: true,
};

// eslint-disable-next-line import/no-default-export
export default config;
