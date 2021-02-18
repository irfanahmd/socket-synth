import React from 'react';
import './Instrument.css';
import { useEffect, useState, useRef } from "react";
import Synth from "../../components/Synth/Synth";
import DrumPad from "../../components/DrumPad/DrumPad";

import * as Tone from "tone";

import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3001";

const Instrument = (props) => {

  const [notes, setNotes] = useState([])
  const { roomId } = props.match.params
  const socketRef  = useRef() 

  useEffect(()=> {

    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId }
    })

    socketRef.current.on('play', playMessage)
    socketRef.current.on('stop', stopMessage)


    function playMessage(note) {
      console.log(note)
      const incomingNote = {
        ...note,
        ownedByCurrentUser: note.senderId === socketRef.current.id
      }

      let src = note.name
      if(note.instrument === 'synth'){
        synth.triggerAttack(src)
      }

      if(note.instrument === 'drumpad' && note.name.toLowerCase() === 'a'){
        kick.triggerAttackRelease('C0','2n'); 
      }

      if(note.instrument === 'drumpad' && note.name.toLowerCase() === 's'){
        snare.triggerAttackRelease('16n'); 
      }

      if((note.instrument === 'drumpad' && note.name.toLowerCase() === 't') || (note.instrument === 'drumpad' && note.name.toLowerCase() === 'y') ){
        hihat.triggerAttackRelease('32n')
      }


      setNotes((notes) => [...notes, incomingNote])
    }

    function stopMessage(note) {
      console.log(note)
      const incomingNote = {
        ...note,
        ownedByCurrentUser: note.senderId === socketRef.current.id
      }

      let src = note.name
      if(note.instrument === 'synth'){
        synth.triggerRelease(src)
      }
      setNotes((notes) => [...notes, incomingNote])
    } 
    
    return () => {
      socketRef.current.disconnect()
    }

  }, [roomId]);

  const synth = new Tone.PolySynth(Tone.Synth).toDestination();

  const kick = new Tone.MembraneSynth().toDestination();

  const lowPass = new Tone.Filter({
    frequency: 11000,
  }).toDestination();

  const snare = new Tone.NoiseSynth({
    volume: 5,
    noise: {
      type: 'pink',
      playbackRate: 3,
    },
    envelope: {
      attack: 0.001,
      decay: 0.20,
      sustain: 0,
      release: 0.03,
    },
  }).connect(lowPass);

  const hihat = new Tone.NoiseSynth({
    volume: -10,
    envelope: {
      attack: 0.02,
      decay: 0.03
    }
  }).toDestination();

  
  const [showSynth, setShowSynth] = useState(true);
  const [showDrumPad, setShowDrumPad] = useState(false);
 

  function toggleInstrument() {
    setShowSynth(!showSynth);
    setShowDrumPad(!showDrumPad);
  }

  return (
    <div className="App">
      {showDrumPad && <DrumPad {...props} toggleInstrument={toggleInstrument} 
      synth={synth}
      kick={kick}
      snare={snare}
      hihat={hihat}
      socketRef={socketRef}
      />}
      {showSynth && <Synth 
      {...props} 
      toggleInstrument={toggleInstrument} 
      synth={synth}
      kick={kick}
      snare={snare}
      hihat={hihat}
      socketRef={socketRef}
      />}
    </div>
  );
  
}

export default Instrument;