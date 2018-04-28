import React from "react";
import { ListItem, ListItemText, ListItemSecondaryAction } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import Add from "material-ui-icons/Add";
import Avatar from "material-ui/Avatar";
import { graphql, compose } from "react-apollo";

import { DELETE_INVITE_MUTATION, GET_ALL_INVITES } from "../../Queries/Invite";
import { ADD_LIKE_STATUS } from "../../Queries/LikeStatus";
import noGameIcon from "../../Assets/noGame.svg";

class InviteItem extends React.Component {
  deleteInvite = () => {
    console.log(this.props.invite);
    const { id } = this.props.invite;
    this.props.deleteInviteMutation({
      variables: { id },
    });
    this.props.handleDeleteInvite(id);
  };

  addLike = () => {
    const { id } = this.props.invite;
    this.props.addLikeStatus({
      variables: { inviteId: id },
    });
  };

  render() {
    const { game: { name }, expiredAt } = this.props.invite;
    return (
      <ListItem button divider>
        <Avatar alt="No Game" src={noGameIcon} />
        <ListItemText primary={name} secondary={expiredAt} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.deleteInvite}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="Add" onClick={this.addLike}>
            <Add />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default compose(
  graphql(ADD_LIKE_STATUS, {
    name: "addLikeStatus",
  }),
  graphql(DELETE_INVITE_MUTATION, {
    name: "deleteInviteMutation",
    options: {
      update: (proxy, { data: { deleteInvite } }) => {
        const data = proxy.readQuery({ query: GET_ALL_INVITES });
        const newInviteList = data.getAllInvites.filter(
          invite => invite.id !== deleteInvite.data.id,
        );
        proxy.writeQuery({ query: GET_ALL_INVITES, data: { getAllInvites: newInviteList } });
      },
    },
  }),
)(InviteItem);
