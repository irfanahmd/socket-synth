import React from 'react'
import { Link, useHistory } from "react-router-dom";
import "./Home.css";
import Instrument from "../../components/Instrument/Instrument";

import { Input, Button, Image } from 'antd';


const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  }

  const history= useHistory()

  return (
    <div>
    <div className="outerDiv">
      <div className='enterRoom'>
      <h2>Welcome to Socket Synth</h2>
        <p>A simple to use web-based synthesizer that allows users to collaborate realtime via chat rooms.</p>
        <Image width={600}src="https://i.ibb.co/PFL6dDX/Screen-Shot-2021-02-20-at-12-25-04-AM.png" alt="Screen-Shot-2021-02-20-at-12-25-04-AM" />
      <Input
      type='text'
      placeholder='Enter Room Name'
      value = {roomName}
      onChange={handleRoomNameChange}
      onPressEnter={() => history.push(`/${roomName}`)}
       />
       <Link to={`/${roomName}`}> 
       <Button type='primary' block>Create/Join Room</Button>
       </Link>
      </div>
      </div>
    </div>
  )
}

export default Home;