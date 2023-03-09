import { useState } from 'react';
import styles from './styles.module.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.app}>
      <h1>Vite + React</h1>
      <button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
};

export { App };
