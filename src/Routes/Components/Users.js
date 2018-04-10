import React, { Component } from "react";
import { Container, Header, Input, Button, Form, Divider, Table } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class Users extends Component {
  state = {
    users: [],
    name: "",
    email: "",
    password: "",
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    const { name, email, password } = this.state;
    const res = await this.props.mutate({
      variables: { name, email, password },
    });
    console.log(res);
  };

  getAllUsers = () => {
    const { getAllUsers: users } = this.props.data;
    this.setState({ users });
  };

  render() {
    const allUsers = this.state.users.map(user => (
      <Table.Row key={user.id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
      </Table.Row>
    ));
    return (
      <Container text>
        <Header as="h1">Users</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{allUsers}</Table.Body>
        </Table>
        <Button primary onClick={this.getAllUsers}>
          Show All Users
        </Button>
        <Divider />
        <Form>
          <Header as="h2">Create User</Header>
          <Form.Field>
            <Input onChange={this.onChange} name="name" placeholder="Username" fluid />
          </Form.Field>
          <Form.Field>
            <Input onChange={this.onChange} name="email" placeholder="Email" fluid />
          </Form.Field>
          <Form.Field>
            <Input onChange={this.onChange} name="password" type="password" placeholder="Password" fluid />
          </Form.Field>
          <Button primary onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

const getAllUsers = gql`
  query {
    getAllUsers {
      id
      name
      email
    }
  }
`;

const createUserMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password)
  }
`;

export default graphql(getAllUsers, createUserMutation)(Users);
