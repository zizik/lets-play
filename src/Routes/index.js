import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import Home from "./Components/Home";
import Users from "./Components/Users";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users" exact component={Users} />
    </Switch>
  </BrowserRouter>
);
