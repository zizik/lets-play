import React from "react";
import { ListItem, ListItemText, ListItemSecondaryAction } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";

class Invite extends React.Component {
  render() {
    const { invite: { game } } = this.props;
    return (
      <ListItem button divider>
        {/* <ListItemAvatar><GameIcon game="Overwatch" /></ListItemAvatar> */}
        <ListItemText primary={game.name} secondary="24:00:00" />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.handleDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Invite;
