import React from "react";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { withFormik } from "formik";
import styled from "styled-components";

const StyledButton = styled(Button)`
  && {
    margin-top: 15px;
  }
`;

const Invites = ({ handleSubmit, handleChange, values, ...rest }) => (
  <form>
    <Typography variant="title" gutterBottom align="center">
      Create Invite
    </Typography>
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor="description">Description</InputLabel>
      <Input id="description" value={values.description} onChange={handleChange} />
    </FormControl>
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor="gameId">Game Id</InputLabel>
      <Input id="gameId" value={values.gameId} onChange={handleChange} />
    </FormControl>
    <StyledButton onClick={handleSubmit} color="primary" variant="raised">
      Submit
    </StyledButton>
  </form>
);

const createInviteMutation = gql`
  mutation($description: String!, $gameId: Int!) {
    createInvite(description: $description, gameId: $gameId) {
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
      gameId: 1,
    }),
    handleSubmit: async (values, { props }, rest) => {
      const { data: { createInvite } } = await props.createInviteMutation({
        variables: values,
      });
      if (createInvite.ok) {
        props.history.push("/");
      }
    },
  }),
)(Invites);
