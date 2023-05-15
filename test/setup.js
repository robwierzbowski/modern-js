// Vitest's Jest-like API is compatible with these Jest matchers
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { expect, afterEach, beforeEach } from 'vitest';

// Extend Vitest with matchers from react-testing-library
expect.extend(matchers);

beforeEach(() => {
  // Require at least one expect per it block
  // eslint-disable-next-line vitest/no-standalone-expect
  expect.hasAssertions();
});

afterEach(() => {
  // Cleanup after each test case (e.g., resetting jsdom)
  cleanup();
});
