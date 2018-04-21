import React, { Component } from "react";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import styled from "styled-components";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

import InviteItem from "./InviteItem";

const StyledList = styled(List)`
  width: 100%;
`;

class InvitesList extends Component {
  state = {
    invites: [],
  };

  componentWillReceiveProps({ getAllInvites: { loading, getAllInvites: invites } }) {
    if (!loading && this.props.getAllInvites.loading !== loading) {
      this.setState({ invites });
    }
  }

  handleDeleteInvite = id => async () => {
    const deleted = await this.props.deleteInviteMutation({
      variables: { id },
    });
    console.log(deleted);
  };

  render() {
    const invitesItems = this.state.invites.map(invite => (
      <InviteItem key={invite.id} invite={invite} handleDelete={this.handleDeleteInvite} />
    ));
    return (
      <StyledList>
        <Divider light />
        {invitesItems}
      </StyledList>
    );
  }
}

const getAllInvites = gql`
  query {
    getAllInvites {
      id
      userId
      description
      game {
        name
        icon
      }
    }
  }
`;

const deleteInviteMutation = gql`
  mutation($id: Int!) {
    deleteInvite(id: $id) {
      ok
      errors {
        reason
        message
      }
    }
  }
`;

export default compose(
  graphql(deleteInviteMutation, { name: "deleteInviteMutation" }),
  graphql(getAllInvites, { name: "getAllInvites" }),
)(InvitesList);
