import "./App.css";
import * as Tone from "tone";
import { useEffect, useState } from "react";
import { keyToNote } from "./utils/keymaps";

function App() {
  const synth = new Tone.PolySynth().toDestination();

  const [octave, setOctave] = useState(3);

  // const whitekeys = "asdfghjkl;'".split("");
  // const blackkeys = "q  w-e-r-t  y-u-i  o-p-[".split("-");

  // toggled state when keypressed or clicked

  const [appState, changeState] = useState({
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

  // function for shifting octave in the keyboard

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
    let lowkey = key.toLowerCase();
    synth.triggerAttack(getNote(lowkey));
    if ("asdfghjkl;'".includes(lowkey)) {
      let whiteindex = appState.whiteobjects.findIndex((i) =>
        i.id.includes(lowkey)
      );
      toggleActiveWhite(whiteindex);
    } else if ("qwertyuiop[".includes(lowkey)) {
      let blackindex = appState.blackobjects.findIndex((i) =>
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
      let whiteindex = appState.whiteobjects.findIndex((i) =>
        i.id.includes(lowkey)
      );
      toggleActiveWhite(whiteindex);
    } else if ("qwertyuiop[".includes(lowkey)) {
      let blackindex = appState.blackobjects.findIndex((i) =>
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
    let arrayCopy = [...appState.blackobjects];
    arrayCopy[index].toggled
      ? (arrayCopy[index].toggled = false)
      : (arrayCopy[index].toggled = true);

    changeState({ ...appState, blackobjects: arrayCopy });
  }

  function toggleActiveWhite(index) {
    let arrayCopy = [...appState.whiteobjects];
    arrayCopy[index].toggled
      ? (arrayCopy[index].toggled = false)
      : (arrayCopy[index].toggled = true);

    changeState({ ...appState, whiteobjects: arrayCopy });
  }

  function toggleActiveStyleBlack(index) {
    if (
      appState.blackobjects[index].toggled ||
      appState.whiteobjects[index].toggled
    ) {
      return "active";
    } else {
      return "inactive";
    }
  }

  function toggleActiveStyleWhite(index) {
    if (appState.whiteobjects[index].toggled) {
      return "active";
    } else {
      return "inactive";
    }
  }

  return (
    <div className="App">
      <synth>
        {/* black keys */}

        <div className="note-wrapper">
          {appState.blackobjects.map((blackkey, index) => (
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
                toggleActiveBlack(index);
              }}
            >
              {blackkey.id.toUpperCase()}
            </button>
          ))}
        </div>

        {/* white keys */}
        <div className="note-wrapper">
          {appState.whiteobjects.map((whitekey, index) => (
            <button
              className={
                "note-white" +
                " " +
                whitekey.id +
                " " +
                toggleActiveStyleWhite(index)
              }
              onMouseDown={() => {
                playNote(getNote(whitekey.id[0]));
              }}
              onMouseUp={() => {
                stopNote(getNote(whitekey.id[0]));
                toggleActiveWhite(index);
              }}
            >
              {whitekey.id.toUpperCase()}
            </button>
          ))}
        </div>
      </synth>
    </div>
  );
}

export default App;
