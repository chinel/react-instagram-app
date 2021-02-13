import React from "react";
import { useUserCardStyles } from "../../styles";
import { Link } from "react-router";
import { Avatar, Typography } from "@material-ui/core";

function UserCard({ user }) {
  const classes = useUserCardStyles();
  const { username, profile_image, name } = user;

  return (
    <div className={classes.wrapper}>
      <Link to={`/${username}`}>
        <Avatar
          src={profile_image}
          alt="User Avatar"
          className={classes.avatar}
        />
      </Link>
      <div className={classes.nameWrapper}>
        <Link to={`/${username}`}>
          <Typography className={classes.typography} variant="subtitle2">
            {username}
          </Typography>
        </Link>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.typography}
        >
          {name}
        </Typography>
      </div>
    </div>
  );
}

export default UserCard;
