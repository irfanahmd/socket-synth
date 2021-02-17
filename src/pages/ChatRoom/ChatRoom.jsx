import React from 'react'
import { Link } from "react-router-dom";
import "./ChatRoom.css";
import Synth from "../../components/Synth/Synth";

const ChatRoom = (props) => {
  const { roomId } = props.match.params
  // const { messages, sendMessage } = useChat(roomId); 
  // const [newMessage, setNewMessage] = React.useState("");


  return (
    <Synth roomId={roomId}/>
  )

}


export default ChatRoom;