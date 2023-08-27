import React, { useState, useEffect } from 'react';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [midiData, setMidiData] = useState([]);
  const [currentSongID, setCurrentSongID] = useState(null);
  const csrftoken = getCookie('csrftoken');

  const startRecording = async () => {
    // Assuming you have a function to get the user's IP
    // const ipAddress = await getUserIP();
    const ipAddress = "123.00.00.1"
    setIsRecording(true);

    console.log('csrftoken', csrftoken)

    // Send request to Django to create a new song entry
    const response = await fetch('/api/songs/', {
      method: 'POST',
      body: JSON.stringify({ ip_address: ipAddress, midiData }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
    });

    const data = await response.json();
    // Assuming the backend sends back the newly created song's ID
    setCurrentSongID(data.id);
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Clear any MIDI data in memory, if needed
  };

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(async () => {
        // Send MIDI data to RabbitMQ through Django
        await fetch('/api/songs/update-midi/', {
          method: 'PUT',
          body: JSON.stringify({ id: currentSongID, midi_binary: midiData }),
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          },
        });
      }, 5000);

      return () => clearInterval(interval);  // Clear interval on component unmount
    }
  }, [isRecording, midiData]);


  // Handle user interaction to store MIDI binary data here

  // setInterval logic to push MIDI data to backend

  return (
    <div>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
    </div>
  );
}

export default Recorder;
