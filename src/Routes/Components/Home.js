import React from "react";
import { graphql, compose } from "react-apollo";

import InviteList from "./InvitesList";
import { GET_ALL_INVITES } from "../../Queries/Invite";
import { GET_USER_FRIENDS } from "../../Queries/Friend";

function Invites(props) {
  const { getUserFriends, getAllInvites } = props;
  const userInvites = !getAllInvites.loading ? getAllInvites.getAllInvites : [];
  const friendsInvites = !getUserFriends.loading ? getUserFriends.getUserFriends.data : [];
  console.log(userInvites, friendsInvites);

  return (
    <React.Fragment>
      <InviteList listName="Свои приглашения" invites={userInvites} />
      {/* <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Приглашения друзуй</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <StyledExpansionPanel>
          <InviteList invites={friendsInvites} />
        </StyledExpansionPanel>
      </ExpansionPanel> */}
    </React.Fragment>
  );
}

export default compose(
  graphql(GET_ALL_INVITES, { name: "getAllInvites" }),
  graphql(GET_USER_FRIENDS, { name: "getUserFriends" }),
)(Invites);
