import React from 'react';
import './Synth.css';
import * as Tone from "tone";
import { useEffect, useState } from "react";
import { keyToNote } from "../../utils/keymaps";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function Synth() {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();

  const [playing, setPlaying] = useState('')

  const [octave, setOctave] = useState(4);

  useEffect(()=> {
    function playMessage(m) {
      console.log(m)
      let src = m.path
      if(m){
        synth.triggerAttack(src)
      }
      setPlaying(m.name)
    }
    function stopMessage(m) {
      console.log(m)
      let src = m.path
      if(m){
        synth.triggerRelease(src)
      }
      setPlaying(m.name)
    }
    socket.on('play', playMessage)
    socket.on('stop', stopMessage)
    
    return () => {
      socket.off('play', playMessage)
      socket.off('stop', stopMessage)
    }
  }, [])

 

  const [keyState, setToggle] = useState({
    blackobjects: [
      { id: "q  w", toggled: false },
      { id: "e", toggled: false },
      { id: "r", toggled: false },
      { id: "t y", toggled: false },
      { id: "u", toggled: false },
      { id: "i  o", toggled: false },
      { id: "p", toggled: false },
      { id: "[", toggled: false },
    ],
    whiteobjects: [
      { id: "a", toggled: false },
      { id: "s", toggled: false },
      { id: "d", toggled: false },
      { id: "f", toggled: false },
      { id: "g", toggled: false },
      { id: "h", toggled: false },
      { id: "j", toggled: false },
      { id: "k", toggled: false },
      { id: "l", toggled: false },
      { id: ";", toggled: false },
      { id: "'", toggled: false },
    ],
  });


  useEffect(() => {
    function keydownfunc(evt) {
      if (!evt.repeat) {
        downHandler(evt);
      }
    }

    window.addEventListener("keydown", keydownfunc, false);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", keydownfunc, false);
      window.removeEventListener("keyup", upHandler);
    };
  }, [octave]);

  function getNote(key) {
    let lowerString = ["q", "a", "w", "s", "e", "d", "r", "f"];
    let upperString = [
      "g",
      "t",
      "y",
      "h",
      "u",
      "j",
      "i",
      "k",
      "o",
      "l",
      "p",
      ";",
      "'",
      "[",
    ];

    if (lowerString.indexOf(key) !== -1) {
      return `${keyToNote[key]}${octave}`;
    }
    if (upperString.indexOf(key) !== -1) {
      return `${keyToNote[key]}${octave + 1}`;
    }
    return;
  }

  function downHandler(event) {
      const { key } = event;

      if (key === 'ArrowLeft') {
        handleOctaveDown()
      }

      if (key === 'ArrowRight') {
        handleOctaveUp()
      }

      let lowkey = key.toLowerCase();
      // synth.triggerAttack(getNote(lowkey));
      let lowkeyNote = getNote(lowkey)

      if ("asdfghjkl;'qwertyuiop[".includes(lowkey)){
        socket.emit('play', {name: 'Test sound 1', path: lowkeyNote, type: 'attack'})
      }
      
      if ("asdfghjkl;'".includes(lowkey)) {
        let whiteindex = keyState.whiteobjects.findIndex((i) =>
          i.id.includes(lowkey)
        );
        toggleActiveWhite(whiteindex);
      } else if ("qwertyuiop[".includes(lowkey)) {
        let blackindex = keyState.blackobjects.findIndex((i) =>
          i.id.includes(lowkey)
        );
        toggleActiveBlack(blackindex);
      } else {
        return;
      }
  }

  function upHandler(event) {
      const { key } = event;
      let lowkey = key.toLowerCase();
      // synth.triggerRelease(getNote(lowkey));
      let lowkeyNote = getNote(lowkey)

      if ("asdfghjkl;'qwertyuiop[".includes(lowkey)){
        socket.emit('stop', {name: 'Test sound 1', path: lowkeyNote, type: 'release'})
      }

      if ("asdfghjkl;'".includes(lowkey)) {
        let whiteindex = keyState.whiteobjects.findIndex((i) =>
          i.id.includes(lowkey)
        );
        toggleActiveWhite(whiteindex);
      } else if ("qwertyuiop[".includes(lowkey)) {
        let blackindex = keyState.blackobjects.findIndex((i) =>
          i.id.includes(lowkey)
        );
        toggleActiveBlack(blackindex);
      } else {
        return;
      }
  }

  function playNote(note) {
    synth.triggerAttack(`${note}`);
  }

  function stopNote(note) {
    synth.triggerRelease(`${note}`);
  }

  function toggleActiveBlack(index) {
    let arrayCopy = [...keyState.blackobjects];
    arrayCopy[index].toggled
      ? (arrayCopy[index].toggled = false)
      : (arrayCopy[index].toggled = true);
    setToggle({ ...keyState, blackobjects: arrayCopy });
  }

  function toggleActiveWhite(index) {
    let arrayCopy = [...keyState.whiteobjects];
    arrayCopy[index].toggled
      ? (arrayCopy[index].toggled = false)
      : (arrayCopy[index].toggled = true);

    setToggle({ ...keyState, whiteobjects: arrayCopy });
  }

  function toggleActiveStyleBlack(index) {
    if (keyState.blackobjects[index].toggled) {
      return "active";
    } else {
      return "inactive";
    }
  }

  function toggleActiveStyleWhite(index) {
    if (keyState.whiteobjects[index].toggled) {
      return "active";
    } else {
      return "inactive";
    }
  }

  function handleOctaveUp() {
    if (octave < 8) {
      setOctave(octave + 1)
    }  
  }

  function handleOctaveDown() {
    if (octave > 0)
    {setOctave(octave - 1)}
  }


  return (
    <>
    <div className="row">
      {/* black keys */}
      <div className='col-1'>
        <div className="note-wrapper">
          {keyState.blackobjects.map((blackkey, index) => (
            <button
              className={
                "note-black" +
                " " +
                blackkey.id +
                " " +
                toggleActiveStyleBlack(index)
              }
              key={index}
              onMouseDown={() => {
                playNote(getNote(blackkey.id[0]));
              }}
              onMouseUp={() => {
                stopNote(getNote(blackkey.id[0]));
              }}
            >
              {blackkey.id.toUpperCase()}
            </button>
          ))}
        <div className='note-wrapper'>
          <button className= "synth-keys">🎹</button>
          <button className= "synth-keys">🥁</button>
        </div>
        </div>
        {/* white keys */}
        <div className="note-wrapper">
          {keyState.whiteobjects.map((whitekey, index) => (
            <button
              className={
                "note-white" +
                " " +
                whitekey.id +
                " " +
                toggleActiveStyleWhite(index)
              }
              key={index}
              onMouseDown={() => {
                playNote(getNote(whitekey.id));
              }}
              onMouseUp={() => {
                stopNote(getNote(whitekey.id));
              }}
            >
              {whitekey.id.toUpperCase()}
            </button>
          ))}
          <div className='col-1'>
            <div className='note-wrapper'>
              <button className= "synth-keys">ph</button>
              <button className= "synth-keys">ph</button>
            </div>
            <div className='note-wrapper'>
              <button className= "synth-keys" onClick={handleOctaveDown} disabled={(octave == 0) ? true : false}>＜</button>
              <button className= "synth-keys" onClick={handleOctaveUp} disabled={(octave == 8) ? true : false}>＞</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Synth;