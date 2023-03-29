import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App/index.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
