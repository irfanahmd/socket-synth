import React, {useRef, useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import "./Home.css";

import { Input, Button, Image } from 'antd';


const Home = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  }

  const roomInput = useRef(null)
  const history= useHistory()

  useEffect(()=> {
    roomInput.current.focus()
  }, [])

  return (
    <div>
    <div className="outerDiv">
      <div className='enterRoom'>
      <h2>Welcome to Socket Synth</h2>
        <p>A simple to use web-based synthesizer that allows artists to play live in real time with each other via chat rooms </p>
        <Image width={600}src="https://i.ibb.co/PFL6dDX/Screen-Shot-2021-02-20-at-12-25-04-AM.png" alt="Screen-Shot-2021-02-20-at-12-25-04-AM" />
      <Input
      type='text'
      placeholder='Enter Room Name'
      value = {roomName}
      ref={roomInput}
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