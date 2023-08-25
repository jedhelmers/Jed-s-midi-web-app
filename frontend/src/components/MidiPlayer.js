import React, { useState } from 'react';
import { Midi } from '@tonejs/midi';
import { Synth, start } from 'tone';

const synth = new Synth().toDestination();

const MidiPlayer = () => {
  const [midiFile, setMidiFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const midi = new Midi(arrayBuffer);
    
    setMidiFile(midi);
  };

  const handlePlay = async () => {
    await start();

    midiFile.tracks[0].notes.forEach(note => {
      synth.triggerAttackRelease(note.name, note.duration, note.time);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handlePlay}>Play MIDI</button>
    </div>
  );
};

export default MidiPlayer;
