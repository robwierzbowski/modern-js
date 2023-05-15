import { expect, afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest with matchers from react-testing-library
expect.extend(matchers);

// Require at least one expect per it block
beforeEach(() => {
  expect.hasAssertions();
});

// Cleanup after each test case (e.g., resetting jsdom)
afterEach(() => {
  cleanup();
});
