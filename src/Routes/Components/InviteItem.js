import React from "react";
import { ListItem, ListItemText, ListItemSecondaryAction } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";

export default ({ handleDelete, invite: { game, id } }) => (
  <ListItem button divider>
    {/* <ListItemAvatar><GameIcon game="Overwatch" /></ListItemAvatar> */}
    <ListItemText primary={game.name} secondary="24:00:00" />
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete" onClick={handleDelete(id)}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);
