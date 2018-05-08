import React from "react";
import styled from "styled-components";

import InvitesList from "./InvitesList";

const StyledListName = styled("p")`
  && {
    font-size: 18px;
    margin: 10px 0;
    text-align: center;
  }
`;

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
    <div key={key}>
      <StyledListName>{key}</StyledListName>
      <InvitesList listName={key} invites={friendsInvites[key]} />
    </div>
  ));
  return <div> {FriendsList}</div>;
};
