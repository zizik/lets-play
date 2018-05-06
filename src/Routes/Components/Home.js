import React from "react";
import { withStyles } from "material-ui/styles";
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Divider from "material-ui/Divider";
import InviteList from "./InvitesList";

const styles = theme => ({
  root: {
    padding: 0,
  },
});

function Invites(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Свои приглашения</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className={classes.root}>
          <InviteList />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Приглашения друзуй</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className={classes.root}>
          <InviteList />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
}

export default withStyles(styles)(Invites);
