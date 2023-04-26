beforeEach(() => {
  // Fail if a test has no assertions. The jest/expect-expect ESLint rule will
  // warn when a test or it block has no expect call at all, but this assertion
  // will fail if a test block never calls an existing expect (e.g., from
  // incorrect conditionals or async code).
  // eslint-disable-next-line jest/no-standalone-expect
  expect.hasAssertions();
});
