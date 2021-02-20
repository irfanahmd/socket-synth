import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../../pages/LoginPage/LoginPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import Home from "../../pages/Home/Home";
import Instrument from "../../components/Instrument/Instrument";
import { Route, Switch } from "react-router-dom";
import userService from "../../utils/userService";
import { useState } from "react";
// import io from "socket.io-client";

function App() {
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
      <NavBar user={user} handleLogout={handleLogout} handleSignupOrLogin={handleSignupOrLogin}/>
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
        <Route exact path="/" component={Home} />
        <Route exact path="/:roomId" component={Instrument} />
        {/* <Synth /> */}
      </Switch>
    </div>
  );
}

export default App;
