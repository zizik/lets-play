import React, { Component } from "react";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import styled from "styled-components";
import { graphql, compose } from "react-apollo";

import InviteItem from "./InviteItem";
import { getAllInvites, deleteInviteMutation } from "../../Queries/Invite";

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
    const response = await this.props.deleteInviteMutation({
      variables: { id },
    });
    if (response.data.deleteInvite.ok) {
      const newList = this.state.invites.filter(invite => invite.id !== id);
      this.setState({ invites: newList });
    }
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

export default compose(
  graphql(deleteInviteMutation, { name: "deleteInviteMutation" }),
  graphql(getAllInvites, { name: "getAllInvites" }),
)(InvitesList);
