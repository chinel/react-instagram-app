import { useMutation } from "@apollo/react-hooks";
import { Button, Dialog, Divider, Zoom } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { defaultPost } from "../../data";
import { UNFOLLOW_USER, DELETE_POST } from "../../graphql/mutations";
import { useOptionsDialogStyles } from "../../styles";

function OptionsDialog({ onClose, authorId, postId }) {
  const classes = useOptionsDialogStyles();
  const { currentUserId, followingIds } = React.useContext(UserContext);
  const isOwner = authorId === currentUserId;
  const buttonText = isOwner ? "Delete" : "Unfollow";
  const onClick = isOwner ? handleDeletePost : handleUnfollowUser;
  const isFollowing = followingIds.some((id) => id === authorId);
  const isUnrelatedUser = !isOwner && !isFollowing;
  const [unFollowUser] = useMutation(UNFOLLOW_USER);
  const [deletePost] = useMutation(DELETE_POST);
  function handleDeletePost() {}

  function handleUnfollowUser() {
    const variables = {
      userIdToFollow: authorId,
      currentUserId,
    };
    unFollowUser({ variables });
    onClose();
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
      }}
      onClose={onClose}
      TransitionComponent={Zoom}
    >
      {!isUnrelatedUser && (
        <Button className={classes.redButton}>Unfollow</Button>
      )}
      <Divider />
      <Button className={classes.button}>
        <Link to={`/p/${defaultPost.id}`}>Go to post</Link>
      </Button>
      <Divider />
      <Button className={classes.button}>Share </Button>
      <Divider />
      <Button className={classes.button}>Copy Link </Button>
      <Divider />
      <Button onClick={onClose} className={classes.button}>
        Cancel
      </Button>
    </Dialog>
  );
}

export default OptionsDialog;
