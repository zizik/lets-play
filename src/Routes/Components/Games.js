import React, { Component } from "react";
import { Container, Header, Input, Button, Form, Divider, Table } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

class Games extends Component {
  state = {
    name: "",
    icon: "",
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    const { name, icon } = this.state;
    await this.props.createGameMutation({
      variables: { name, icon: icon || "No Icon" },
    });
  };

  render() {
    const { loading, getAllGames: games = [] } = this.props.games;
    const allGames =
      !loading &&
      games.map(user => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.icon}</Table.Cell>
        </Table.Row>
      ));

    return (
      <Container text>
        <Header as="h1">Games</Header>
        <Form>
          <Header as="h2">Create Game</Header>
          <Form.Field>
            <Input onChange={this.onChange} name="name" placeholder="Game Name" fluid />
          </Form.Field>
          <Form.Field>
            <Input onChange={this.onChange} name="icon" placeholder="Icon" fluid />
          </Form.Field>
          <Button primary onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
        <Divider />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Game Name</Table.HeaderCell>
              <Table.HeaderCell>Game Icon</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{allGames}</Table.Body>
        </Table>
      </Container>
    );
  }
}

const getAllGames = gql`
  query {
    getAllGames {
      id
      name
      icon
    }
  }
`;

const createGameMutation = gql`
  mutation($name: String!, $icon: String) {
    createGame(name: $name, icon: $icon) {
      id
      name
      icon
    }
  }
`;

export default compose(graphql(getAllGames, { name: "games" }), graphql(createGameMutation, { name: "createGameMutation" }))(Games);
