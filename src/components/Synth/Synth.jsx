import React from 'react';
import './Synth.css';
import * as Tone from "tone";
import { useEffect, useState } from "react";
import { keyToNote } from "../../utils/keymaps";


function Synth() {
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();

  const [octave, setOctave] = useState(3);

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
  }, []);

  function downHandler(event) {
    //when making piano component remove wrapper to see if it works independently

      const { key } = event;
      let lowkey = key.toLowerCase();
      synth.triggerAttack(getNote(lowkey));
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
      synth.triggerRelease(getNote(lowkey));
      if ("asdfghjkl;'".includes(key)) {
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

  return (
    <div>
      {/* black keys */}

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
      </div>
    </div>
  )
}

export default Synth;