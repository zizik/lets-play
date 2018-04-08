import React, { Component } from "react";
import { Container, Header, Input, Button, Form } from "semantic-ui-react";

class Users extends Component {
  render() {
    return (
      <Container text>
        <Header as="h2">Users</Header>
        <Form>
          <Form.Field>
            <Input onChange={this.onChange} name="username" placeholder="Username" fluid />
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

export default Users;
