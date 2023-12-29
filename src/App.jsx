import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  function handleClick() {
    alert('clicked');
  }
  return (
    <>
      <h1>The Counter</h1>
      <form>
        <input type="text" />
        <button onClick={handleClick}>Submit</button>
      </form>
    </>
  );
}

export default App;
