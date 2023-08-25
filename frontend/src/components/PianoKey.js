import React from 'react';
import Button from 'react-bootstrap/Button';

const PianoKey = ({ note, isBlack, onPlayNote }) => (
  <Button
    data-testid={note}
    style={{
      width: isBlack ? '30px' : '60px',
      height: '120px',
      backgroundColor: isBlack ? 'black' : 'white',
      border: '1px solid #ccc',
      position: 'relative',
      zIndex: isBlack ? 1 : 0,
      marginLeft: isBlack ? '-15px' : 0,
      marginRight: isBlack ? '-15px' : 0,
    }}
    onMouseDown={() => onPlayNote(note)}
    onMouseUp={() => onPlayNote(null)}
  />
);

export default PianoKey;
