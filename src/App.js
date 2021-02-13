import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PosterInfo from "./containers/PosterInfo";
import Results from "./containers/Results";
import Home from "./containers/Home";

export default function App() {
  const renderRouter = () => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movie/:movieId" component={PosterInfo} />
        <Route exact path="/results" component={Results} />
      </Switch>
    );
  };

  return <BrowserRouter>{renderRouter()}</BrowserRouter>;
}
