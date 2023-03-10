import { useState } from 'react';
import styles from './styles.module.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.app}>
      <h1>Vite + React + TS + EsBuild</h1>
      <button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </button>
    </div>
  );
};

export { App };
