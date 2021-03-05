import {
  Avatar,
  Button,
  Dialog,
  Divider,
  Typography,
  Zoom,
} from "@material-ui/core";
import React from "react";
import { useProfilePageStyles } from "../../styles";

function UnFollowDialog({ user, onClose }) {
  const classes = useProfilePageStyles();

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.unfollowDialogScrollPaper,
      }}
      onClose
      TransitionComponent={Zoom}
    >
      <div className={classes.wrapper}>
        <Avatar
          src={user.profile_image}
          alt={`${user.username}'s avatar`}
          className={classes.avatar}
        />
      </div>
      <Typography align="center" className={classes.unfollowDialogText}>
        Unfollow @{user.username}
      </Typography>
      <Divider />
      <Button className={classes.unfollowButton}>Unfollow</Button>
      <Divider />
      <Button onClick={onClose} className={classes.cancelButton}>
        Cancel
      </Button>
    </Dialog>
  );
}

export default UnFollowDialog;
