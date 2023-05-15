import { useCallback, useState } from 'react';
import styles from './styles.module.css';

const App = () => {
  const [count, setCount] = useState(0);
  const onClick = useCallback(() => setCount(val => val + 1), []);

  return (
    <div className={styles.app}>
      <h1>Vite + React + TS + EsBuild</h1>
      <button className={styles.button} onClick={onClick} type="button">
        count is {count}
      </button>
    </div>
  );
};

export { App };
