import React from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ListExampleBasic = () => (
  <List>
    <List.Item>
      <Link to="/users"> Users </Link>
    </List.Item>
    <List.Item>
      <Link to="/games"> Games </Link>
    </List.Item>
    <List.Item>
      <Link to="/invites"> Invites </Link>
    </List.Item>
    <List.Item>
      <Link to="/register"> Register </Link>
    </List.Item>
    <List.Item>
      <Link to="/login"> Login </Link>
    </List.Item>
  </List>
);

export default ListExampleBasic;
