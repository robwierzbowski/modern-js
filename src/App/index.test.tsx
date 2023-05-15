import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './index.tsx';

describe('App', () => {
  it('renders App content', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Vite + React + TS + EsBuild + Vitest',
    );
  });

  it('increments counter on click', async () => {
    render(<App />);

    const user = userEvent.setup();
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('count is 0');

    await user.click(button);

    expect(button).toHaveTextContent('count is 1');

    await user.click(button);

    expect(button).toHaveTextContent('count is 2');
  });
});
