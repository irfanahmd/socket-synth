import React from 'react';
import './DrumPad.css';
import * as Tone from "tone";
import { useEffect, useState, useRef } from "react";

import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3001";


const DrumPad = (props) => {

  useEffect(() => {

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
      // kick.triggerAttackRelease('C0','2n'); 
      props.socketRef.current.emit('play', {name: key, type: 'attackrelease', instrument: 'drumpad'})
    }

    if (key.toLowerCase() === 's') {
      // snare.triggerAttackRelease('16n'); 
      props.socketRef.current.emit('play', {name: key, type: 'attackrelease', instrument: 'drumpad'})
    }

    if (key.toLowerCase() === 't' || key.toLowerCase() === 'y') {
      // hihat.triggerAttackRelease('32n')
      props.socketRef.current.emit('play', {name: key, type: 'attackrelease', instrument: 'drumpad'})
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