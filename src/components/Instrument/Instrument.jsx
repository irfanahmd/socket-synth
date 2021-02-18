import React from 'react';
import './Instrument.css';
import { useEffect, useState, useRef } from "react";
import Synth from "../../components/Synth/Synth";
import DrumPad from "../../components/DrumPad/DrumPad";


const Instrument = (props) => {

  const [showSynth, setShowSynth] = useState(true);
  const [showDrumPad, setShowDrumPad] = useState(false);

  function toggleInstrument() {
    setShowSynth(!showSynth);
    setShowDrumPad(!showDrumPad);
  }

  return (
    <div className="App">
      {showDrumPad && <DrumPad {...props} toggleInstrument={toggleInstrument}/>}
      {showSynth && <Synth {...props} toggleInstrument={toggleInstrument}/>}
    </div>
  );
  
}

export default Instrument;