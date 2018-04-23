import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import styled from "styled-components";

import Header from "./Components/Header";
import Home from "./Components/Home";
import Users from "./Components/Users";
import Games from "./Components/Games";
import CreateInvite from "./Components/CreateInvite";
import Register from "./Components/Register";
import Login from "./Components/Login";

const Container = styled("div")`
  margin: auto;
  width: 1127px;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 991px) {
    width: 723px;
  }
  @media (max-width: 1200px) {
    width: 933px;
  }
`;

export default props => (
  <BrowserRouter>
    <div>
      <Header />
      <Container>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={Users} />
          <Route path="/games" exact component={Games} />
          <Route path="/create-invite" exact component={CreateInvite} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Container>
    </div>
  </BrowserRouter>
);
