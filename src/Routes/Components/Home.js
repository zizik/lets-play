import React from "react";
import { graphql, compose } from "react-apollo";

import InviteList from "./InvitesList";
import FriendsInviteList from "./FriendsInviteList";
import { GET_ALL_INVITES } from "../../Queries/Invite";
import { GET_USER_FRIENDS } from "../../Queries/Friend";

function Invites(props) {
  const { getUserFriends, getAllInvites } = props;
  const userInvites = !getAllInvites.loading ? getAllInvites.getAllInvites : [];
  const friendsInvites = !getUserFriends.loading ? getUserFriends.getUserFriends.data : [];
  console.log(userInvites);
  // console.log(userInvites, friendsInvites);

  return (
    <React.Fragment>
      <InviteList listName="Свои приглашения" invites={userInvites} />
      <FriendsInviteList listName="Приглашения друзей" invites={friendsInvites} />
    </React.Fragment>
  );
}

export default compose(
  graphql(GET_ALL_INVITES, { name: "getAllInvites" }),
  graphql(GET_USER_FRIENDS, { name: "getUserFriends" }),
)(Invites);
