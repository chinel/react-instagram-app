import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useFollowSuggestionsStyles } from "../../styles";
import FollowButton from "./FollowButton";

function FollowSuggestionsItem({ user }) {
  const classes = useFollowSuggestionsStyles();
  const { profile_image, username, name, id } = user;

  return (
    <div>
      <div className={classes.card}>
        <Link to={`/${username}`}>
          <Avatar
            src={profile_image}
            alt={`${username}'s profile`}
            classes={{
              root: classes.avatar,
              img: classes.avatarImg,
            }}
          />
        </Link>
        <Link to={`/${username}`}>
          <Typography
            variant="subtitle2"
            className={classes.text}
            align="center"
          >
            {username}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
            className={classes.text}
            align="center"
          >
            {name}
          </Typography>
          <FollowButton id={id} side={false} />
        </Link>
      </div>
    </div>
  );
}

export default FollowSuggestionsItem;
