import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/likes').then(res => res.json()).then(data => {
      setCurrentTime(data.likes);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Likes on latest tweet are {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;