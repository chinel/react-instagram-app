import { Avatar } from "@material-ui/core";
import React from "react";
import { useProfilePictureStyles } from "../../styles";

function ProfilePicture({ user }) {
  const classes = useProfilePictureStyles();

  return (
    <>
      <Avatar
        src={user.profile_image}
        alt="User Avatar"
        className={classes.avatar}
      />
    </>
  );
}

export default ProfilePicture;
