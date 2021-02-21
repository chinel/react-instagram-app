import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { getDefaultPost, defaultUser } from "../../data";
import { LoadingLargeIcon } from "../../icons";
import { useMorePostsFromUserStyles } from "../../styles";
import GridPost from "../shared/GridPost";

function MorePostsFromUser() {
  const classes = useMorePostsFromUserStyles();

  let loading = false;

  return (
    <div className={classes.container}>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        component="h2"
        gutterBottom
        className={classes.typography}
      >
        More Posts from{" "}
        <Link to={`/${defaultUser.username}`} className={classes.link}>
          @{defaultUser.username}
        </Link>
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <article className={classes.article}>
          <div className={classes.postContainer}>
            {Array.from({ length: 6 }, () => getDefaultPost()).map(
              (post, index) => (
                <GridPost key={index} post={post} />
              )
            )}
          </div>
        </article>
      )}
    </div>
  );
}

export default MorePostsFromUser;
