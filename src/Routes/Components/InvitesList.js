import React, { Component } from "react";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import styled from "styled-components";
import InviteItem from "./InviteItem";
// import Api from "../../api/api";

const StyledList = styled(List)`
  width: 100%;
`;

class InvitesList extends Component {
  state = {
    invites: [],
  };

  // async componentWillMount() {
  //   const invites = (await Api.getIvites()) || {};
  //   // const invites = await Api.addInvite({ game: "Overwatch", time: 3000 });
  //   this.setState({ invites: Object.values(invites) });
  // }

  render() {
    const invitesItems = this.state.invites.map(invite => <InviteItem key={invite.id} />);
    return (
      <StyledList>
        <Divider light />
        {invitesItems}
      </StyledList>
    );
  }
}

export default InvitesList;
