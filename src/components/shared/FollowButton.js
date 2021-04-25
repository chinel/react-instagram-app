import { Button } from "@material-ui/core";
import React from "react";
import { UserContext } from "../../App";
import { useFollowButtonStyles } from "../../styles";

function FollowButton({ side, id }) {
  const classes = useFollowButtonStyles({ side });
  const { currentUserId, followingIds } = React.useContext(UserContext);
  const isAlreadyFollowing = followingIds.some(
    (followingId) => followingId === id
  );
  const [isFollowing, setIsFollowing] = React.useState(isAlreadyFollowing);

  const followButton = (
    <Button
      variant={side ? "text" : "contained"}
      color="primary"
      className={classes.button}
      onClick={() => setIsFollowing(true)}
      fullWidth
    >
      Follow
    </Button>
  );

  const followingButton = (
    <Button
      variant={side ? "text" : "outlined"}
      className={classes.button}
      onClick={() => setIsFollowing(false)}
      fullWidth
    >
      Following
    </Button>
  );

  return isFollowing ? followingButton : followButton;
}

export default FollowButton;
