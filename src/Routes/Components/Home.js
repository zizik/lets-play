import React from "react";
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Divider from "material-ui/Divider";
import styled from "styled-components";
import { graphql, compose } from "react-apollo";

import InviteList from "./InvitesList";
import { GET_ALL_INVITES } from "../../Queries/Invite";
import { GET_USER_FRIENDS } from "../../Queries/Friend";

const StyledExpansionPanel = styled(ExpansionPanelDetails)`
  && {
    padding: 0;
  }
`;

function Invites(props) {
  const { getUserFriends, getAllInvites } = props;
  const userInvites = !getAllInvites.loading ? getAllInvites.getAllInvites : [];
  const friendsInvites = !getUserFriends.loading ? getUserFriends.getUserFriends.data : [];

  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Свои приглашения</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <StyledExpansionPanel>
          <InviteList invites={userInvites} />
        </StyledExpansionPanel>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Приглашения друзуй</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <StyledExpansionPanel>
          <InviteList invites={friendsInvites} />
        </StyledExpansionPanel>
      </ExpansionPanel>
    </React.Fragment>
  );
}

export default compose(
  graphql(GET_ALL_INVITES, { name: "getAllInvites" }),
  graphql(GET_USER_FRIENDS, { name: "getUserFriends" }),
)(Invites);
