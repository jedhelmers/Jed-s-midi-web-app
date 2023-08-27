import React, { useEffect } from 'react';

import MidiPlayer from './components/MidiPlayer'
import Piano from './components/Piano'
import Recorder from './components/Record';
import MidiGrid from './components/MidiGrid';

import logo from './logo.svg';
import './App.css';

// let userId = null

function App() {

  useEffect(() => {
    // Read the user ID from the DOM
    const userId = document.getElementById('root').getAttribute('data-user-id');

    // Stash the user ID as a cookie
    document.cookie = `user_id=${userId}; path=/`;

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{width: 60}}/>
        <MidiGrid />
        {/* <Recorder />
        <MidiPlayer />
        <div className="piano-section">
          <Piano />
        </div> */}
      </header>
    </div>
  );
}

export default App;
