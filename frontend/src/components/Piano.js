import React from 'react';
import PianoKey from './PianoKey';
import { Synth } from 'tone';

const synth = new Synth().toDestination();

const notes = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5"];

const Piano = () => {
  const handlePlayNote = (note) => {
    if (note) {
      console.log(`Note On: ${note}`);
      synth.triggerAttack(note);
    } else {
      console.log('Note Off');
      synth.triggerRelease();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {
        notes.map((note, i) => (
            <PianoKey id={note} key={note} note={note} onPlayNote={handlePlayNote} isBlack={note.includes("#")} />
        ))
      }
    </div>
  );
};

export default Piano;
