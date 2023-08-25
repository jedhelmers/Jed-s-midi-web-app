import MidiPlayer from './components/MidiPlayer'
import Piano from './components/Piano'
import Recorder from './components/Record';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Recorder />
        <MidiPlayer />
        <div className="piano-section">
          <Piano />
        </div>
      </header>
    </div>
  );
}

export default App;
