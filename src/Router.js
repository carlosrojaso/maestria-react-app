import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./About";
import App from "./App";
import NotFound from "./components/NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
