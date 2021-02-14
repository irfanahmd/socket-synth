import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../../pages/LoginPage/LoginPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import Synth from "../../components/Synth/Synth";
import { Route, Switch } from "react-router-dom";
import userService from "../../utils/userService";
import { useState } from "react";

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
        {/* <Route path="/logout" /> */}
        <Synth />
      </Switch>
    </div>
  );
}

export default App;
