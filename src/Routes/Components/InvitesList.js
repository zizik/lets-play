import React, { Component } from "react";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import styled from "styled-components";
import { graphql } from "react-apollo";

import InviteItem from "./InviteItem";
import { getAllInvites } from "../../Queries/Invite";

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

  handleDeleteInvite = id => {
    const invites = this.state.invites.filter(invite => invite.id !== id);
    this.setState({ invites });
  };

  render() {
    const invitesItems = this.state.invites.map(invite => (
      <InviteItem key={invite.id} invite={invite} handleDeleteInvite={this.handleDeleteInvite} />
    ));
    return (
      <StyledList>
        <Divider light />
        {invitesItems}
      </StyledList>
    );
  }
}

export default graphql(getAllInvites, { name: "getAllInvites" })(InvitesList);
