import React, { useState } from 'react';

const Counter: React.FC = () => {
  // Initialize state for the counter with an initial value of 0
  const [count, setCount] = useState<number>(0);

  // Function to increment the counter
  const increment = () => {
    console.log(count);
    setCount(count + 1);
  }

  // Function to decrement the counter
  const decrement = () => setCount(count - 1);

  // Function to reset the counter to 0
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Counter: {count}</h1>
      <div>
        <button onClick={increment} style={{ padding: '10px 20px', margin: '5px' }}>
          Increment
        </button>
        <button onClick={decrement} style={{ padding: '10px 20px', margin: '5px' }}>
          Decrement
        </button>
        <button onClick={reset} style={{ padding: '10px 20px', margin: '5px' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
