import React, { Component } from "react";
import { Container, Header, Input, Button, Form, Divider } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class Users extends Component {
  state = {
    // users: [],
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

  render() {
    return (
      <Container text>
        <Header as="h1">Users</Header>
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

const registerMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Users);
