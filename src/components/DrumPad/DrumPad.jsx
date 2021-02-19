import React from 'react';
import './DrumPad.css';
import * as Tone from "tone";
import { useEffect, useState, useRef } from "react";

import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3001";


const DrumPad = (props) => {

  const [kickActive, setKickActive] = useState(false)
  const [snareActive, setSnareActive] = useState(false)
  const [hihatActive, setHihatActive] = useState(false)

  useEffect(() => {

    function keydownfunc(evt) {
      if (!evt.repeat) {
        downHandler(evt);
      }
    }

    window.addEventListener("keydown", keydownfunc, false);
    window.addEventListener("keyup", upHandler, false);
    return () => {
      window.removeEventListener("keydown", keydownfunc, false);
      window.removeEventListener("keydown", upHandler);
    };
  }, []);

  function downHandler(event) {

    const { key } = event

    console.log(key)

    if (key.toLowerCase() === 'a') {
      // kick.triggerAttackRelease('C0','2n'); 
      props.socketRef.current.emit('play', {name: key, type: 'attackrelease', instrument: 'drumpad'})
      setKickActive(true)
    }

    if (key.toLowerCase() === 's') {
      // snare.triggerAttackRelease('16n'); 
      props.socketRef.current.emit('play', {name: key, type: 'attackrelease', instrument: 'drumpad'})
      setSnareActive(true)
    }

    if (key.toLowerCase() === 't' || key.toLowerCase() === 'y') {
      // hihat.triggerAttackRelease('32n')
      props.socketRef.current.emit('play', {name: key, type: 'attackrelease', instrument: 'drumpad'})
      setHihatActive(true)
    }
  }

  function upHandler(event) {
    
    const { key } = event
    if (key.toLowerCase() === 'a') {
      setKickActive(false)
    }
    if (key.toLowerCase() === 's') {
      setSnareActive(false)
    }
    if (key.toLowerCase() === 't' || key.toLowerCase() === 'y') {
      setHihatActive(false)
    }

  }

    function toggleKick() {
    if(kickActive) {
      return "active"
    } else {
      return "inactive"
    }
  }

  function toggleSnare() {
    if(snareActive) {
      return "active"
    } else {
      return "inactive"
    }
  }

  function toggleHihat() {
    if(hihatActive) {
      return "active"
    } else {
      return "inactive"
    }
  }

  function playKick() {
    props.socketRef.current.emit('play', {name: 'a', type: 'attackrelease', instrument: 'drumpad'})
  }

  function playSnare() {
    props.socketRef.current.emit('play', {name: 's', type: 'attackrelease', instrument: 'drumpad'})
  }

  function playHihat() {
    props.socketRef.current.emit('play', {name: 't', type: 'attackrelease', instrument: 'drumpad'})
  }

  return (
    <div className= "row">
      <button className= {"pad" + " " + toggleKick()} onMouseDown={() => {playKick()}}>A KICK</button>
      <button className= {"pad" + " " + toggleSnare()} onMouseDown={() => {playSnare()}}>S SNARE</button>
      <button className= {"pad" + " " + toggleHihat()} onMouseDown={() => {playHihat()}}>T  Y HIHAT</button>
      <button className= "pad" onClick={props.toggleInstrument}>  🎹
      </button>
      <button className= "synth-keys" disabled='true'>🥁</button>
    </div>
  )

}

export default DrumPad;