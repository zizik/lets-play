import React from "react";
import { Container, Header, Input, Button, Form, Divider, Table } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withFormik } from "formik";

const Invites = ({ getAllInvites: { loading, getAllInvites: invites }, submitForm, handleChange, values, ...props }) => {
  // const { loading, getAllInvites: invites } = getAllInvites;
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
          <Input onChange={handleChange} value={values.description} name="description" placeholder="Invite description" fluid />
        </Form.Field>
        <Form.Field>
          <Input onChange={handleChange} value={values.userId} type="number" name="userId" placeholder="User Id" fluid />
        </Form.Field>
        <Form.Field>
          <Input onChange={handleChange} value={values.gameId} type="number" name="gameId" placeholder="Game Id" fluid />
        </Form.Field>
        <Button primary onClick={submitForm}>
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
};

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

export default compose(
  graphql(getAllInvites, { name: "getAllInvites" }),
  graphql(createInviteMutation, { name: "createInviteMutation" }),
  withFormik({
    mapPropsToValues: props => ({
      description: "",
      userId: 1,
      gameId: 1,
    }),
    handleSubmit: async (values, { props }) => {
      await props.createInviteMutation({
        variables: values,
      });
      await props.getAllInvites.refetch();
    },
  }),
)(Invites);
