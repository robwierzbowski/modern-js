import userEventExport from '@testing-library/user-event';
import type { userEvent as userEventDefinition } from '@testing-library/user-event/dist/types/setup/index.d.ts';

// @ts-expect-error The user-event cjs export is processed in a way that creates
// a wrapping object with a default key around the default export. I'm not sure
// if this is the fault of user-event's package.json file definitions and file
// extensions, or esbuild-jest-transform's transpilation. Until there's a fix,
// we'll use this stub to reference userEvent. Reference:
// https://github.com/testing-library/user-event/issues/839
const userEvent = userEventExport.default as typeof userEventDefinition;

export { userEvent };
