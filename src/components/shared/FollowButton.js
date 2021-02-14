import { Button } from "@material-ui/core";
import React from "react";
import { useFollowButtonStyles } from "../../styles";

function FollowButton({ side }) {
  const classes = useFollowButtonStyles({ side });
  const [isFollowing, setIsFollowing] = React.useState(false);

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
      variant={side ? "outlined" : "text"}
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
