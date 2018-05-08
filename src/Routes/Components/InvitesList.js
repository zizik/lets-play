import React, { Component } from "react";
import List from "material-ui/List";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Divider from "material-ui/Divider";
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "material-ui/ExpansionPanel";
import styled from "styled-components";
import moment from "moment";

import InviteItem from "./InviteItem";

const StyledList = styled(List)`
  width: 100%;
`;

const StyledExpansionPanel = styled(ExpansionPanelDetails)`
  && {
    padding: 0;
  }
`;

class InvitesList extends Component {
  static defaultProps = {
    invites: [],
    listName: "",
  };

  state = {
    invites: [],
  };

  componentWillReceiveProps(nextProps) {
    const invites = nextProps.invites.map(invite => ({
      ...invite,
      ...{
        expiredAt: moment(new Date(invite.expiredAt)).format("Заканчивается DD.MM в HH:MM "),
      },
    }));
    this.setState({ invites });
  }

  handleDeleteInvite = id => {
    const invites = this.state.invites.filter(invite => invite.id !== id);
    this.setState({ invites });
  };

  render() {
    const { listName } = this.props;
    const invitesItems = this.state.invites.map(invite => (
      <InviteItem key={invite.id} invite={invite} handleDeleteInvite={this.handleDeleteInvite} />
    ));
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{listName}</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <StyledExpansionPanel>
          <StyledList>
            <Divider light />
            {invitesItems}
          </StyledList>
        </StyledExpansionPanel>
      </ExpansionPanel>
    );
  }
}

export default InvitesList;
