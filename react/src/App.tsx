import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import './App.css';
import { getUser } from "./auth";
import { UserContext } from "./userContext";

import ProtectedRoute from './ProtectedRoute';
import Home from "./Home";
import Splash from "./Splash";

const App = () => {
  const [loadingApp, setLoadingApp] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  // Check for a user token when app initialises.
  // Don't want to redirect logged in user so delay until loggedIn set to true or false
  useEffect(() => {
    setLoggedIn(!!getUser());
    setLoadingApp(false);
  }, []);
  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      {!loadingApp && (
        <Router style={{ minHeight: "100vh" }}>
          <Splash path="/welcome/*" />
          <ProtectedRoute path="/*" component={Home} />
        </Router>)}
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
    </UserContext.Provider>
  );
}

export default App;
