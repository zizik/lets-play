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
import moment from "moment";

import { CREATE_INVITE_MUTATION } from "../../Queries/Invite";
import { GET_ALL_GAMES } from "../../Queries/Game";

const StyledButton = styled(Button)`
  && {
    margin-top: 15px;
  }
`;

const Invites = ({ handleSubmit, handleChange, values, allGames }) => {
  /* eslint-disable */
  const gamesList = !allGames.getAllGames
    ? null
    : allGames.getAllGames.map(game => (
        <MenuItem key={game.id} value={game.id}>
          {game.name}
        </MenuItem>
      ));
  /* eslint-enable */
  return (
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
        <Select id="gameId" name="gameId" value={values.gameId} onChange={handleChange}>
          {gamesList}
        </Select>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="expiredAt">Expired Time</InputLabel>
        <Select id="expiredAt" name="expiredAt" value={values.expiredAt} onChange={handleChange}>
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
};

export default compose(
  graphql(GET_ALL_GAMES, { name: "allGames" }),
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
      const expiredAt = moment().add(values.expiredAt, "hours");
      const { data: { createInvite } } = await props.createInviteMutation({
        variables: { ...values, expiredAt },
      });
      if (createInvite.ok) {
        props.history.push("/");
      }
    },
  }),
)(Invites);
