import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import HomePage from "./components/Homepage";
import WelcomePage from "./components/WelcomePage";
import Navigation from "./components/Navigation";
import ProjectTasks from "./components/LeftMenu/ProjectTasks";
import LabelTasks from "./components/LeftMenu/LabelTasks";
import ReactGA from 'react-ga';
import RouteChangeTracker from "./components/GoogleAnalytics/RouteChangeTracker";

const TRACKING_ID = "G-VMB5D647GS"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactGA.event({
  category: 'User',
  action: 'Created an Account'
});

ReactGA.exception({
  description: 'An error ocurred',
  fatal: true
});

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
          <Route path='/projects/:projectId' >
            <ProjectTasks />
          </Route>
          <Route path='/labels/:labelId' >
            <LabelTasks />
          </Route>
        </Switch>

      )}
      <RouteChangeTracker />
    </>
  );
}

export default App;
