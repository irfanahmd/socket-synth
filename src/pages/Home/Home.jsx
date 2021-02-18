import React from 'react'
import { Link } from "react-router-dom";
import "./Home.css";
import Synth from "../../components/Synth/Synth";

import DrumPad from "../../components/DrumPad/DrumPad";


const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  }

  return (
    <div>
      <input
      type='text'
      placeholder='Enter Room Name'
      value = {roomName}
      onChange={handleRoomNameChange}
       />
       <Link to={`/${roomName}`}> 
       <button>Join room</button>
       </Link>
       <DrumPad />
    </div>
  )
}

export default Home;