import React from "react";
import { Container, Header, Input, Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withFormik } from "formik";

const Invites = ({ submitForm, handleChange, values }) => (
  <Container text>
    <Header as="h1">Invites</Header>
    <Form>
      <Header as="h2">Create Invite</Header>
      <Form.Field>
        <Input
          onChange={handleChange}
          value={values.description}
          name="description"
          placeholder="Invite description"
          fluid
        />
      </Form.Field>
      <Form.Field>
        <Input
          onChange={handleChange}
          value={values.userId}
          type="number"
          name="userId"
          placeholder="User Id"
          fluid
        />
      </Form.Field>
      <Form.Field>
        <Input
          onChange={handleChange}
          value={values.gameId}
          type="number"
          name="gameId"
          placeholder="Game Id"
          fluid
        />
      </Form.Field>
      <Button primary onClick={submitForm}>
        Submit
      </Button>
    </Form>
  </Container>
);

const createInviteMutation = gql`
  mutation($description: String!, $userId: Int!, $gameId: Int!) {
    createInvite(description: $description, userId: $userId, gameId: $gameId) {
      ok
      data {
        id
        description
        gameId
        userId
      }
      errors {
        reason
        message
      }
    }
  }
`;

export default compose(
  graphql(createInviteMutation, {
    name: "createInviteMutation",
  }),
  // graphql(createInviteMutation, {
  //   name: "createInviteMutation",
  //   options: {
  //     update: (proxy, { data: { createInvite } }) => {
  //       if (createInvite.data) {
  //         const data = proxy.readQuery({ query: getAllInvites });
  //         data.getAllInvites.push(createInvite.data);
  //         proxy.writeQuery({ query: getAllInvites, data });
  //       }
  //     },
  //   },
  // }),
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
    },
  }),
)(Invites);
