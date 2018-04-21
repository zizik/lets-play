import React from "react";
import { ListItem, ListItemText, ListItemSecondaryAction } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class Invite extends React.Component {
  handleDelete = async () => {
    const { invite: { id }, deleteInviteMutation } = this.props;
    const deleted = await deleteInviteMutation({
      variables: { id },
    });
    console.log(deleted);
  };

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

const deleteInviteMutation = gql`
  mutation($id: Int!) {
    deleteInvite(id: $id) {
      ok
      errors {
        reason
        message
      }
    }
  }
`;

export default graphql(deleteInviteMutation, { name: "deleteInviteMutation" })(Invite);
