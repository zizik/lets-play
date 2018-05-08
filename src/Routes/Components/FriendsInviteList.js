import React from "react";

import InvitesList from "./InvitesList";

export default ({ listName, invites }) => {
  const friendsInvites = {};
  invites.forEach(invite => {
    const { name } = invite.friend;
    const userInvite = { ...invite.invite, ...{ game: invite.game } };
    if (friendsInvites[name]) {
      friendsInvites[name].push(userInvite);
    } else {
      friendsInvites[name] = [userInvite];
    }
  });
  const FriendsList = Object.keys(friendsInvites).map(key => (
    <InvitesList key={key} listName={key} invites={friendsInvites[key]} />
  ));
  return <div> {FriendsList}</div>;
};
