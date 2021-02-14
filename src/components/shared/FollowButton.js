import { Button } from "@material-ui/core";
import React from "react";
import { useFollowButtonStyles } from "../../styles";

function FollowButton({ side }) {
  const classes = useFollowButtonStyles({ side });
  const [isFollowing, setIsFollowing] = React.useState(false);

  const followButton = (
    <Button
      variant={side ? "text" : "contained"}
      colors="primary"
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
      following
    </Button>
  );

  return <div>FollowButton</div>;
}

export default FollowButton;
