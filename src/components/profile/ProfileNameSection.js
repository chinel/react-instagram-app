import { Button, Hidden, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { GearIcon } from "../../icons";
import { useProfilePageStyles } from "../../styles";
import UnFollowDialog from "./UnFollowDialog";

function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
  const classes = useProfilePageStyles();
  const [showUnFollowDialog, setShowUnFollowDialog] = React.useState(false);
  let followButton;
  const isFollowing = true;
  const isFollower = false;
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
      <Button variant="contained" color="primary" className={classes.button}>
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
              <Link to="/account/edit">
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
