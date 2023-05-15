import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest with matchers from react-testing-library
expect.extend(matchers);

// Cleanup after each test case (e.g., resetting jsdom)
afterEach(() => {
  cleanup();
});
