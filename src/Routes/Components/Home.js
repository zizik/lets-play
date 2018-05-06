import React from "react";
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Divider from "material-ui/Divider";
import styled from "styled-components";

import InviteList from "./InvitesList";

const StyledExpansionPanel = styled(ExpansionPanelDetails)`
  && {
    padding: 0;
  }
`;

function Invites(props) {
  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Свои приглашения</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <StyledExpansionPanel>
          <InviteList />
        </StyledExpansionPanel>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Приглашения друзуй</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <StyledExpansionPanel>
          <InviteList />
        </StyledExpansionPanel>
      </ExpansionPanel>
    </React.Fragment>
  );
}

export default Invites;
