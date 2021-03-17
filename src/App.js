import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import Login from "./pages/login/login";
import MainView from "./pages/main/main";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={MainView} />
          <Redirect from="*" to="/login" />
        </Switch>
      </div>
    </Router>
  );
}
