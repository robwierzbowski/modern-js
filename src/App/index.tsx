import { useState } from 'react';
import styles from './styles.module.css';

const App = () => {
  const [count, setCount] = useState(0);
  const onClick = () => setCount(val => val + 1);

  return (
    <div className={styles.app}>
      <h1>Vite + React + TS + EsBuild</h1>
      <button onClick={onClick}>count is {count}</button>
    </div>
  );
};

export { App };
