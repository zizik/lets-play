import React from "react";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import { graphql, compose } from "react-apollo";
import { withFormik } from "formik";
import styled from "styled-components";

import { CREATE_INVITE_MUTATION } from "../../Queries/Invite";

const StyledButton = styled(Button)`
  && {
    margin-top: 15px;
  }
`;

const Invites = ({ handleSubmit, handleChange, values }) => (
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
    <FormControl margin="normal" fullWidth>
      <InputLabel htmlFor="expiredTime">Expired Time</InputLabel>
      <Select id="expiredTime" name="expiredTime" value={values.expiredAt} onChange={handleChange}>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
    </FormControl>
    <StyledButton onClick={handleSubmit} color="primary" variant="raised">
      Submit
    </StyledButton>
  </form>
);

export default compose(
  graphql(CREATE_INVITE_MUTATION, {
    name: "createInviteMutation",
    options: {
      update: (proxy, { data: { createInvite } }) => {
        if (createInvite.data) {
          proxy.reset();
        }
      },
    },
  }),
  withFormik({
    mapPropsToValues: props => ({
      description: "",
      gameId: 1,
      expiredAt: 7,
    }),
    handleSubmit: async (values, { props }) => {
      const { data: { createInvite } } = await props.createInviteMutation({
        variables: values,
      });
      if (createInvite.ok) {
        props.history.push("/");
      }
    },
  }),
)(Invites);
