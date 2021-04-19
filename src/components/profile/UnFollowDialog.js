import { useMutation } from "@apollo/react-hooks";
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  Typography,
  Zoom,
} from "@material-ui/core";
import React from "react";
import { UNFOLLOW_USER } from "../../graphql/mutations";
import { useProfilePageStyles } from "../../styles";
import { UserContext } from "../../App";

function UnFollowDialog({ user, onClose, onUnFollowUser }) {
  const classes = useProfilePageStyles();
  const { currentUserId } = React.useContext(UserContext);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  function handleUnfollowUser() {
    const variables = {
      userIdToFollow: user.id,
      currentUserId,
    };
    unfollowUser({ variables });
    onUnFollowUser();
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.unfollowDialogScrollPaper,
      }}
      onClose={onClose}
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
