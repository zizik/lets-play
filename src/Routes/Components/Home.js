import React from "react";
import { graphql, compose } from "react-apollo";

import ListWrapper from "./ListWrapper";
import InviteList from "./InvitesList";
import FriendsInviteList from "./FriendsInviteList";
import { GET_ALL_INVITES } from "../../Queries/Invite";
import { GET_USER_FRIENDS } from "../../Queries/Friend";

function Invites(props) {
  const { getUserFriends, getAllInvites } = props;
  const userInvites = !getAllInvites.loading ? getAllInvites.getAllInvites : [];
  const friendsInvites = !getUserFriends.loading ? getUserFriends.getUserFriends.data : [];

  return (
    <React.Fragment>
      <ListWrapper listName="Свои приглашения" expanded>
        <InviteList invites={userInvites} />
      </ListWrapper>
      <ListWrapper listName="Приглашения друзей">
        <FriendsInviteList friends={friendsInvites} />
      </ListWrapper>
    </React.Fragment>
  );
}

export default compose(
  graphql(GET_ALL_INVITES, { name: "getAllInvites" }),
  graphql(GET_USER_FRIENDS, { name: "getUserFriends" }),
)(Invites);
