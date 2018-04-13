import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import Home from "./Components/Home";
import Users from "./Components/Users";
import Games from "./Components/Games";
import Invites from "./Components/Invites";
import Register from "./Components/Register";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users" exact component={Users} />
      <Route path="/games" exact component={Games} />
      <Route path="/invites" exact component={Invites} />
      <Route path="/register" exact component={Register} />
    </Switch>
  </BrowserRouter>
);
