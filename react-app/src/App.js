import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import HomePage from "./components/Homepage";
import WelcomePage from "./components/WelcomePage";
import Navigation from "./components/Navigation";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (

        <Switch>
          <Route path="/" exact>
            <WelcomePage />
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
