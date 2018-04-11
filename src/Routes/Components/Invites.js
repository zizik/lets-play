import React, { Component } from "react";
import { Container, Header, Input, Button, Form, Divider, Table } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

class Invites extends Component {
  state = {
    description: "",
    userId: 1,
    gameId: 1,
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    const { description, userId, gameId } = this.state;
    await this.props.createInviteMutation({
      variables: { description, userId, gameId },
    });
    await this.props.getAllInvites.refetch();
  };

  render() {
    const { loading, getAllInvites: invites } = this.props.getAllInvites;
    const allInvites =
      !loading &&
      invites.map(user => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.description}</Table.Cell>
          <Table.Cell>{user.userId}</Table.Cell>
          <Table.Cell>{user.gameId}</Table.Cell>
        </Table.Row>
      ));

    return (
      <Container text>
        <Header as="h1">Invites</Header>
        <Form>
          <Header as="h2">Create Invite</Header>
          <Form.Field>
            <Input onChange={this.onChange} name="description" placeholder="Invite description" fluid />
          </Form.Field>
          <Form.Field>
            <Input onChange={this.onChange} name="userId" placeholder="User Id" fluid />
          </Form.Field>
          <Form.Field>
            <Input onChange={this.onChange} name="gameId" placeholder="Game Id" fluid />
          </Form.Field>
          <Button primary onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
        <Divider />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Invite description</Table.HeaderCell>
              <Table.HeaderCell>User Id</Table.HeaderCell>
              <Table.HeaderCell>Game Id</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{allInvites}</Table.Body>
        </Table>
      </Container>
    );
  }
}

const getAllInvites = gql`
  query {
    getAllInvites {
      id
      description
      userId
      gameId
    }
  }
`;

const createInviteMutation = gql`
  mutation($description: String!, $userId: Int!, $gameId: Int!) {
    createInvite(description: $description, userId: $userId, gameId: $gameId)
  }
`;

export default compose(graphql(getAllInvites, { name: "getAllInvites" }), graphql(createInviteMutation, { name: "createInviteMutation" }))(
  Invites,
);
