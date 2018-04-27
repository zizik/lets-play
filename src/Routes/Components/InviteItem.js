import React from "react";
import { ListItem, ListItemText, ListItemSecondaryAction } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import Avatar from "material-ui/Avatar";
import { graphql } from "react-apollo";

import { DELETE_INVITE_MUTATION, GET_ALL_INVITES } from "../../Queries/Invite";
import noGameIcon from "../../Assets/noGame.svg";

class InviteItem extends React.Component {
  deleteInvite = () => {
    const { id } = this.props.invite;
    this.props.deleteInviteMutation({
      variables: { id },
    });
    this.props.handleDeleteInvite(id);
  };

  render() {
    const { name, expiredAt } = this.props.invite;
    return (
      <ListItem button divider>
        <Avatar alt="No Game" src={noGameIcon} />
        <ListItemText primary={name} secondary={expiredAt} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.deleteInvite}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default graphql(DELETE_INVITE_MUTATION, {
  name: "deleteInviteMutation",
  options: {
    update: (proxy, { data: { deleteInvite } }) => {
      const data = proxy.readQuery({ query: GET_ALL_INVITES });
      const newInviteList = data.getAllInvites.filter(invite => invite.id !== deleteInvite.data.id);
      proxy.writeQuery({ query: GET_ALL_INVITES, data: { getAllInvites: newInviteList } });
    },
  },
})(InviteItem);
