import React from "react";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Divider from "material-ui/Divider";
import ExpansionPanel, { ExpansionPanelSummary } from "material-ui/ExpansionPanel";

export default ({ listName, children, expanded = false }) => (
  <ExpansionPanel defaultExpanded={expanded}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>{listName}</Typography>
    </ExpansionPanelSummary>
    <Divider />
    {children}
  </ExpansionPanel>
);
