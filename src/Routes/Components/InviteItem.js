import React from "react";
import { ListItem, ListItemText, ListItemSecondaryAction } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import { graphql } from "react-apollo";

import { deleteInviteMutation, getAllInvites } from "../../Queries/Invite";

class InviteItem extends React.Component {
  deleteInvite = () => {
    const { id } = this.props.invite;
    this.props.deleteInviteMutation({
      variables: { id },
    });
    this.props.handleDeleteInvite(id);
  };

  render() {
    const { name } = this.props.invite;
    return (
      <ListItem button divider>
        {/* <ListItemAvatar><GameIcon game="Overwatch" /></ListItemAvatar> */}
        <ListItemText primary={name} secondary="24:00:00" />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.deleteInvite}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default graphql(deleteInviteMutation, {
  name: "deleteInviteMutation",
  options: {
    update: (proxy, { data: { deleteInvite } }) => {
      const data = proxy.readQuery({ query: getAllInvites });
      const newInviteList = data.getAllInvites.filter(invite => invite.id !== deleteInvite.data.id);
      proxy.writeQuery({ query: getAllInvites, data: { getAllInvites: newInviteList } });
    },
  },
})(InviteItem);
