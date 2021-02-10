import "./App.css";
import * as Tone from "tone";
import { useEffect } from "react";

function App() {
  const synth = new Tone.PolySynth().toDestination();

  //killer function that stops keydown function from repeating

  useEffect(() => {
    window.addEventListener(
      "keydown",
      function (evt) {
        if (!evt.repeat) {
          downHandler(evt);
        }
      },
      false
    );
    window.addEventListener("keyup", upHandler);
  });

  // functions handling notes on synth

  function downHandler({ key }) {
    //white keys

    if (key === "a") {
      synth.triggerAttack("F3");
    }
    if (key === "s") {
      synth.triggerAttack("G3");
    }
    if (key === "d") {
      synth.triggerAttack("A3");
    }
    if (key === "f") {
      synth.triggerAttack("B3");
    }
    if (key === "g") {
      synth.triggerAttack("C4");
    }
    if (key === "h") {
      synth.triggerAttack("D4");
    }
    if (key === "j") {
      synth.triggerAttack("E4");
    }
    if (key === "k") {
      synth.triggerAttack("F4");
    }
    if (key === "l") {
      synth.triggerAttack("G4");
    }
    if (key === ";") {
      synth.triggerAttack("A4");
    }
    if (key === "'") {
      synth.triggerAttack("B4");
    }

    //black keys

    if (key === "q" || key === "w") {
      synth.triggerAttack("F#3");
    }
    if (key === "e") {
      synth.triggerAttack("G#3");
    }
    if (key === "r") {
      synth.triggerAttack("A#3");
    }
    if (key === "t" || key === "y") {
      synth.triggerAttack("C#4");
    }
    if (key === "u") {
      synth.triggerAttack("D#4");
    }
    if (key === "i" || key === "o") {
      synth.triggerAttack("F#4");
    }
    if (key === "p") {
      synth.triggerAttack("G#4");
    }
    if (key === "[") {
      synth.triggerAttack("A#4");
    }
  }

  function upHandler({ key }) {
    //white keys

    if (key === "a") {
      synth.triggerRelease("F3");
    }
    if (key === "s") {
      synth.triggerRelease("G3");
    }
    if (key === "d") {
      synth.triggerRelease("A3");
    }
    if (key === "f") {
      synth.triggerRelease("B3");
    }
    if (key === "g") {
      synth.triggerRelease("C4");
    }
    if (key === "h") {
      synth.triggerRelease("D4");
    }
    if (key === "j") {
      synth.triggerRelease("E4");
    }
    if (key === "k") {
      synth.triggerRelease("F4");
    }
    if (key === "l") {
      synth.triggerRelease("G4");
    }
    if (key === ";") {
      synth.triggerRelease("A4");
    }
    if (key === "'") {
      synth.triggerRelease("B4");
    }

    //black keys

    if (key === "q" || key === "w") {
      synth.triggerRelease("F#3");
    }
    if (key === "e") {
      synth.triggerRelease("G#3");
    }
    if (key === "r") {
      synth.triggerRelease("A#3");
    }
    if (key === "t" || key === "y") {
      synth.triggerRelease("C#4");
    }
    if (key === "u") {
      synth.triggerRelease("D#4");
    }
    if (key === "i" || key === "o") {
      synth.triggerRelease("F#4");
    }
    if (key === "p") {
      synth.triggerRelease("G#4");
    }
    if (key === "[") {
      synth.triggerRelease("A#4");
    }
  }

  function playNote(note) {
    synth.triggerAttack(`${note}`);
  }

  function stopNote(note) {
    synth.triggerRelease(`${note}`);
  }

  return (
    <div className="App">
      <div className="note-wrapper">
        <button
          className="note-black-wide"
          onMouseDown={() => playNote("F#3")}
          onMouseUp={() => stopNote("F#3")}
        >
          Q W
        </button>
        <button
          className="note-black"
          onMouseDown={() => playNote("G#3")}
          onMouseUp={() => stopNote("G#3")}
        >
          E
        </button>
        <button
          className="note-black-wide"
          onMouseDown={() => playNote("A#3")}
          onMouseUp={() => stopNote("A#3")}
        >
          R
        </button>
        <button
          className="note-black-wide"
          onMouseDown={() => playNote("C#4")}
          onMouseUp={() => stopNote("C#4")}
        >
          T Y
        </button>
        <button
          className="note-black-wide"
          onMouseDown={() => playNote("D#4")}
          onMouseUp={() => stopNote("D#4")}
        >
          U
        </button>
        <button
          className="note-black-wide"
          onMouseDown={() => playNote("F#4")}
          onMouseUp={() => stopNote("F#4")}
        >
          I O
        </button>
        <button
          className="note-black"
          onMouseDown={() => playNote("G#4")}
          onMouseUp={() => stopNote("G#4")}
        >
          P
        </button>
        <button
          className="note-black-wide"
          onMouseDown={() => playNote("A#4")}
          onMouseUp={() => stopNote("A#4")}
        >
          [
        </button>
      </div>
      <div className="note-wrapper">
        <button
          className="note-white"
          onMouseDown={() => playNote("F3")}
          onMouseUp={() => stopNote("F3")}
        >
          A
        </button>
        <button
          className="note-white"
          onMouseDown={() => playNote("G3")}
          onMouseUp={() => stopNote("G3")}
        >
          S
        </button>
        <button
          className="note-white"
          onMouseDown={() => playNote("A3")}
          onMouseUp={() => stopNote("A3")}
        >
          D
        </button>
        <button
          className="note-white"
          onMouseDown={() => playNote("B3")}
          onMouseUp={() => stopNote("B3")}
        >
          F
        </button>
        <button
          className="note-white"
          onMouseDown={() => playNote("C4")}
          onMouseUp={() => stopNote("C4")}
        >
          G
        </button>
        <button
          className="note-white"
          onMouseDown={() => playNote("D4")}
          onMouseUp={() => stopNote("D4")}
        >
          H
        </button>
        <button
          className="note-white"
          onMouseDown={() => playNote("E4")}
          onMouseUp={() => stopNote("E4")}
        >
          J
        </button>
        <button
          className="note-white"
          onMouseDown={() => playNote("F4")}
          onMouseUp={() => stopNote("F4")}
        >
          K
        </button>
        <button
          className="note-white"
          onMouseDown={() => playNote("G4")}
          onMouseUp={() => stopNote("G4")}
        >
          L
        </button>
        <button
          className="note-white"
          onMouseDown={() => playNote("A4")}
          onMouseUp={() => stopNote("A4")}
        >
          ;
        </button>
        <button
          className="note-white"
          onMouseDown={() => playNote("B4")}
          onMouseUp={() => stopNote("B4")}
        >
          '
        </button>
      </div>
    </div>
  );
}

export default App;
