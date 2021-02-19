import React from 'react';
import './Instrument.css';
import { useEffect, useState, useRef } from "react";
import Synth from "../../components/Synth/Synth";
import DrumPad from "../../components/DrumPad/DrumPad";

import * as Tone from "tone";

import io from "socket.io-client";

// const SOCKET_SERVER_URL = "http://localhost:3000";
const SOCKET_SERVER_URL = "https://socket-synth.herokuapp.com/";

const Instrument = (props) => {

  // let synth = null;
  // const kick = null;
  // const snare = null;
  // const hihat = null;

  const lowPass = new Tone.Filter({
    frequency: 11000,
  }).toDestination();

  const [notes, setNotes] = useState([])

  // let roomId

  // if(props.match){
  const { roomId } = props.match.params
  // } 
  // // else {
  // //   roomId = null
  // // }
  
  const socketRef  = useRef() 

  useEffect(()=> {

    const activeSynths = {}
    const activeDrums = {}

 
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId }
    })

    socketRef.current.on('play', playMessage)

    function playMessage(note) {
      console.log(note)
      const incomingNote = {
        ...note,
        ownedByCurrentUser: note.senderId === socketRef.current.id
      }

      let src = note.name

      if(note.instrument === 'synth' && note.type ==='attack'){
        if(!activeSynths[src]) {
          activeSynths[src] = new Tone.PolySynth(Tone.Synth).toDestination();
        } 
        activeSynths[src].triggerAttack(src)
      }

      if(note.instrument === 'synth' && note.type ==='release'){
        if(activeSynths[src]) { 
        console.log(activeSynths)
        activeSynths[src].triggerRelease(src)
        }
        let y = src.split("")[0]
        Object.keys(activeSynths).forEach((key) => {
          if(key.includes(y)){
            activeSynths[key].triggerRelease(key)
          } 
        })
      }

      if(note.instrument === 'drumpad' && note.name.toLowerCase() === 'a'){
        if(!activeDrums[src]) {
          activeDrums[src] = new Tone.MembraneSynth().toDestination();
        }
        activeDrums[src].triggerAttackRelease('C0','2n'); 
      }

      if(note.instrument === 'drumpad' && note.name.toLowerCase() === 's'){
        if(!activeDrums[src]) {
          activeDrums[src] = new Tone.NoiseSynth({
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
        }
        activeDrums[src].triggerAttackRelease('16n'); 
      }

      if((note.instrument === 'drumpad' && note.name.toLowerCase() === 't') || (note.instrument === 'drumpad' && note.name.toLowerCase() === 'y') ){
        if(!activeDrums[src]){
          activeDrums[src] = new Tone.NoiseSynth({
            volume: -10,
            envelope: {
              attack: 0.02,
              decay: 0.03
            }
          }).toDestination();
        }
        activeDrums[src].triggerAttackRelease('32n')
      }
      setNotes((notes) => [...notes, incomingNote])
    }

    return () => {
      socketRef.current.disconnect()
    }

  }, [roomId]);
  
  const [showSynth, setShowSynth] = useState(true);
  const [showDrumPad, setShowDrumPad] = useState(false);

  function toggleInstrument() {
    setShowSynth(!showSynth);
    setShowDrumPad(!showDrumPad);
  }

  return (
    <div className="App">
      {showDrumPad && <DrumPad {...props} toggleInstrument={toggleInstrument} 
      socketRef={socketRef}
      />}
      {showSynth && <Synth 
      {...props} 
      toggleInstrument={toggleInstrument} 
      socketRef={socketRef}
      />}
    </div>
  );
  
}

export default Instrument;