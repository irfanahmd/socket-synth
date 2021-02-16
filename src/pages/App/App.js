import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../../pages/LoginPage/LoginPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import Synth from "../../components/Synth/Synth";
import { Route, Switch } from "react-router-dom";
import userService from "../../utils/userService";
import { useState, useEffect } from "react";
import io from "socket.io-client";

// import * as Tone from "tone";
// const socket = io.connect("http://localhost:3000");
// const synth = new Tone.Synth().toDestination();
// const sound = 'C4'

function App() {

  // const [role, setRole] = useState('')
  // const [playing, setPlaying] = useState('')

  // useEffect(()=> {
  //   function receiveMessage(m) {
  //     console.log(m)
  //     if(role === 'server'){
  //       let src = m.path
  //       synth.triggerAttackRelease(src)
  //     }
  //     setPlaying(m.name)
  //   }
  //   socket.on('play', receiveMessage)
  //   return () => {
  //     socket.off('play', receiveMessage)
  //   }
  // })

  // function handlePlaySound() {
  //   socket.emit('play', {name: 'Test sound 1', path: sound})
  // }

  const [user, setUser] = useState(userService.getUser());

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  function handleSignupOrLogin() {
    setUser(userService.getUser());
  }

  return (
    <div className="App">
      {/* <button onClick={() => setRole('client')}>Client</button>
      <button onClick={() => setRole('server')}>Server</button>
      <button onClick={handlePlaySound}>Play Sound </button> */}
      {/* <h1> {playing} </h1> */}
      <NavBar user={user} handleLogout={handleLogout} />
      <Switch>
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <SignupPage
              history={history}
              handleSignupOrLogin={handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <LoginPage
              history={history}
              handleSignupOrLogin={handleSignupOrLogin}
            />
          )}
        />
        <Synth />
      </Switch>
    </div>
  );
}

export default App;
