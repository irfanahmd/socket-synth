import "./App.css";
import * as Tone from "tone";
import { useEffect, useState } from "react";

function App() {
  const synth = new Tone.PolySynth().toDestination();

  const [octave, setOctave] = useState(3);

  //should be in utils

  const keyToNote = {
    a: "F",
    s: "G",
    d: "A",
    f: "B",
    g: "C",
    h: "D",
    j: "E",
    k: "F",
    l: "G",
    ";": "A",
    "'": "B",
    q: "F#",
    w: "F#",
    e: "G#",
    r: "A#",
    t: "C#",
    y: "C#",
    u: "D#",
    i: "F#",
    o: "F#",
    p: "G#",
    "[": "A#",
  };

  function getNote(keyPressed) {
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
    debugger;
    if (lowerString.indexOf(keyPressed) !== -1) {
      return `${keyToNote[keyPressed]}${octave}`;
    }
    if (upperString.indexOf(keyPressed) !== -1) {
      return `${keyToNote[keyPressed]}${octave + 1}`;
    }
    return;
  }

  //killer function that stops keydown function from repeating

  useEffect(() => {
    function keydownfunc(evt) {
      if (!evt.repeat) {
        downHandler(evt);
      }
    }

    window.addEventListener("keydown", keydownfunc, false);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", keydownfunc);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  // functions handling notes on synth

  function downHandler(event) {
    const { key } = event;

    synth.triggerAttack(getNote(key));
  }

  function upHandler(event) {
    const { key } = event;

    synth.triggerRelease(getNote(key));
  }

  function playNote(note) {
    synth.triggerAttack(`${note}`);
  }

  function stopNote(note) {
    synth.triggerRelease(`${note}`);
  }

  const whitekeys = "asdfghjkl;'".split("");
  const blackkeys = "q  w-e-r-t  y-u-i  o-p-[".split("-");

  return (
    <div className="App">
      <div className="note-wrapper">
        {blackkeys.map((blackkey) => (
          <button
            className="note-black"
            onMouseDown={() => playNote(getNote(blackkey[0]))}
            onMouseUp={() => stopNote(getNote(blackkey[0]))}
          >
            {blackkey.toUpperCase()}
          </button>
        ))}
      </div>

      {/* white keys */}

      <div className="note-wrapper">
        {whitekeys.map((whitekey) => (
          <button
            className="note-white"
            onMouseDown={(e) => {
              playNote(getNote(whitekey));
            }}
            onMouseUp={() => stopNote(getNote(whitekey))}
          >
            {whitekey.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
