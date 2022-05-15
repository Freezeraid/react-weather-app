import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {process.env.REACT_APP_API_KEY}
    </div>
  );
}

export default App;
