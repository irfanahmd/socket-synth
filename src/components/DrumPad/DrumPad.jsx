import React from 'react';
import './DrumPad.css';
import * as Tone from "tone";
import { useEffect, useState, useRef } from "react";

import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000";


const DrumPad = (props) => {

  const { roomId } = props.match.params

  const [notes, setNotes] = useState([])
  const socketRef  = useRef() 

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

  useEffect(() => {

    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId }
    })

    function keydownfunc(evt) {
      if (!evt.repeat) {
        downHandler(evt);
      }
    }

    window.addEventListener("keydown", keydownfunc, false);
    return () => {
      window.removeEventListener("keydown", keydownfunc, false);
    };
  }, []);

  function downHandler(event) {

    const { key } = event

    console.log(key)

    if (key.toLowerCase() === 'a') {
      kick.triggerAttackRelease('C0','2n'); 
    }

    if (key.toLowerCase() === 's') {
      snare.triggerAttackRelease('16n'); 
    }

    if (key.toLowerCase() === 't' || key.toLowerCase() === 'y') {
      hihat.triggerAttackRelease('32n')
    }


  }

  return (
    <div className="row">
      <button className= "pad">A KICK</button>
      <button className= "pad">S SNARE</button>
      <button className= "pad">T  Y HIHAT</button>
      <button className= "pad" onClick={props.toggleInstrument}>  🎹
      </button>
    </div>
  )

}

export default DrumPad;