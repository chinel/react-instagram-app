import { useMutation } from "@apollo/react-hooks";
import { Button } from "@material-ui/core";
import React from "react";
import { UserContext } from "../../App";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../graphql/mutations";
import { useFollowButtonStyles } from "../../styles";

function FollowButton({ side, id }) {
  const classes = useFollowButtonStyles({ side });
  const { currentUserId, followingIds } = React.useContext(UserContext);
  const isAlreadyFollowing = followingIds.some(
    (followingId) => followingId === id
  );
  const [isFollowing, setIsFollowing] = React.useState(isAlreadyFollowing);
  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);
  const variables = {
    userIdToFollow: id,
    currentUserId,
  };

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
