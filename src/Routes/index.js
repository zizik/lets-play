import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import Header from "./Components/Header";
import Home from "./Components/Home";
import Users from "./Components/Users";
import Games from "./Components/Games";
import CreateInvite from "./Components/CreateInvite";
import Register from "./Components/Register";
import Login from "./Components/Login";

export default props => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users" exact component={Users} />
        <Route path="/games" exact component={Games} />
        <Route path="/create-invite" exact component={CreateInvite} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </div>
  </BrowserRouter>
);
