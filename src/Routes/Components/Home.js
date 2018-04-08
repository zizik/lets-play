import React from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ListExampleBasic = () => (
  <List>
    <List.Item>
      <Link to="/users"> Users </Link>
    </List.Item>
  </List>
);

export default ListExampleBasic;
