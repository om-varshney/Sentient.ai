import React, { useState, useEffect } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  const getLikes = () => {
    fetch('/likes').then(res => res.json()).then(data => {
      setCurrentTime(data.likes);
    });
  }

  useEffect(() => {
    getLikes();
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