import React from 'react'
import { Link } from "react-router-dom";
import "./Home.css";
import Instrument from "../../components/Instrument/Instrument";

import { Input, Button } from 'antd';


const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  }

  return (
    <div>
    <div className="outerDiv">
      <div className='enterRoom'>
      <Input
      type='text'
      placeholder='Enter Room Name'
      value = {roomName}
      onChange={handleRoomNameChange}
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