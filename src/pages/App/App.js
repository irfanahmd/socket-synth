import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../../pages/LoginPage/LoginPage";
import Synth from "../../components/Synth/Synth";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        {/* <Route exact path="/signup" render={() => <SignupPage />} /> */}
        <Route exact path="/login" render={() => <LoginPage />} />
        {/* <Route path="/logout" /> */}

        <Synth />
      </Switch>
    </div>
  );
}

export default App;
