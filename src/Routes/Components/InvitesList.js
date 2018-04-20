import React, { Component } from "react";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import styled from "styled-components";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

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

  render() {
    const invitesItems = this.state.invites.map(invite => <InviteItem key={invite.id} invite={invite} />);
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

export default graphql(getAllInvites, { name: "getAllInvites" })(InvitesList);
