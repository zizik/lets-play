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

export default ({ listName, friends }) => {
  const FriendsList = friends.map(friend => (
    <div key={`friend-${friend.id}`}>
      <StyledListName>{friend.name}</StyledListName>
      <InvitesList invites={friend.invites} />
    </div>
  ));
  return <React.Fragment> {FriendsList}</React.Fragment>;
};
