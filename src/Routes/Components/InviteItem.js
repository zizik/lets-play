import React, { Component } from "react";
import { ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
// import GameIcon from "../GameIcon/GameIcon";
// import Api from "../../api/api";

class Invite extends Component {
  // handleDelete(e) {
  //   // Api.getIvites();
  //   Api.addInvite({ game: "overwatch", time: 4000 });
  // }

  render() {
    return (
      <div>
        <ListItem button divider>
          <ListItemAvatar>{/* <GameIcon game="Overwatch" /> */}</ListItemAvatar>
          <ListItemText primary="Overwatch" secondary="24:00:00" />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={this.handleDelete}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }
}

export default Invite;
