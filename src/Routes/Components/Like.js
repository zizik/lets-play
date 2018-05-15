import React from "react";
import Favorite from "material-ui-icons/Favorite";
import Badge from "material-ui/Badge";
import IconButton from "material-ui/IconButton";

export default ({ likes, addLikeStatus }) => (
  <IconButton onClick={addLikeStatus}>
    <Badge badgeContent={likes.length} color="primary">
      <Favorite />
    </Badge>
  </IconButton>
);
