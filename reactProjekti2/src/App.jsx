import { useState } from 'react';
import './App.css';

function App() {
  const [color, setColor] = useState('black');

  const varinVaihto = () => {
    setColor((prevColor) => (prevColor === 'black' ? 'red' : 'black'));
  };
  return (
    <div className="App">
      <h1 style={{ color: color }}>Hello world</h1>
      <button onClick={varinVaihto}>Change Color</button>
    </div>
  );
}

export default App;
