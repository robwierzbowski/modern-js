import { render, screen } from '@testing-library/react';
import { App } from './index.tsx';
import '@testing-library/jest-dom';

describe('App', () => {
  it('renders App content', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Vite + React + TS + EsBuild',
    );
  });
});
