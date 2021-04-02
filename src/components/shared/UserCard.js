import React from "react";
import { useUserCardStyles } from "../../styles";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";

function UserCard({ user, avatarSize = 44, location }) {
  const classes = useUserCardStyles({ avatarSize });

  return user ? (
    <div className={classes.wrapper}>
      <Link to={`/${user.username}`}>
        <Avatar
          src={user.profile_image}
          alt="User Avatar"
          className={classes.avatar}
        />
      </Link>
      <div className={classes.nameWrapper}>
        <Link to={`/${user.username}`}>
          <Typography className={classes.typography} variant="subtitle2">
            {user.username}
          </Typography>
        </Link>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.typography}
        >
          {location || user.name}
        </Typography>
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
}

export default UserCard;
