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

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route
          exact
          path="/signup"
          render={({ history }) => <SignupPage history={history} />}
        />
        <Route exact path="/login" render={() => <LoginPage />} />
        {/* <Route path="/logout" /> */}
        <Synth />
      </Switch>
    </div>
  );
}

export default App;
