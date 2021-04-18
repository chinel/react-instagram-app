import { useMutation } from "@apollo/react-hooks";
import { Button, Hidden, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { FOLLOW_USER } from "../../graphql/mutations";
import { GearIcon } from "../../icons";
import { useProfilePageStyles } from "../../styles";
import UnFollowDialog from "./UnFollowDialog";

function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
  const classes = useProfilePageStyles();
  const [showUnFollowDialog, setShowUnFollowDialog] = React.useState(false);
  const { currentUserId, followingIds, followerIds } = React.useContext(
    UserContext
  );
  const isAlreadyFollowing = followingIds.some((id) => id === user.id);
  const [isFollowing, setFollowing] = React.useState(isAlreadyFollowing);
  const isFollower = !isFollowing && followerIds.some((id) => id === user.id);

  const variables = {
    userIdToFollow: user.id,
    currentUserId,
  };

  const [followUser] = useMutation(FOLLOW_USER);

  function handleFollowUser() {
    setFollowing(true);
    followUser({ variables });
  }

  let followButton;
  // const isFollowing = true;
  if (isFollowing) {
    followButton = (
      <Button
        onClick={() => setShowUnFollowDialog(true)}
        variant="outlined"
        className={classes.button}
      >
        Following
      </Button>
    );
  } else if (isFollower) {
    followButton = (
      <Button
        onClick={handleFollowUser}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Follow Back
      </Button>
    );
  } else {
    followButton = (
      <Button variant="contained" color="primary" className={classes.button}>
        Follow
      </Button>
    );
  }

  return (
    <>
      <Hidden xsDown>
        <section className={classes.usernameSection}>
          <Typography className={classes.username}>{user.username}</Typography>

          {isOwner ? (
            <>
              <Link to="/accounts/edit">
                <Button variant="outlined">Edit Profile</Button>
              </Link>
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            </>
          ) : (
            <>{followButton}</>
          )}
        </section>
      </Hidden>
      <Hidden smUp>
        <section>
          <div className={classes.usernameDivSmall}>
            <Typography className={classes.username}>
              {user.username}
            </Typography>
            {isOwner && (
              <div
                onClick={handleOptionsMenuClick}
                className={classes.settingsWrapper}
              >
                <GearIcon className={classes.settings} />
              </div>
            )}
          </div>
          {isOwner ? (
            <Link to="/account/edit">
              <Button variant="outlined" style={{ width: "100%" }}>
                Edit Profile
              </Button>
            </Link>
          ) : (
            followButton
          )}
        </section>
      </Hidden>
      {showUnFollowDialog && (
        <UnFollowDialog
          onClose={() => setShowUnFollowDialog(false)}
          user={user}
        />
      )}
    </>
  );
}

export default ProfileNameSection;
