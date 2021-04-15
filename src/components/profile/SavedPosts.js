import { Typography } from "@material-ui/core";
import React from "react";
import { useProfileTabsStyles } from "../../styles";
import GridPost from "../shared/GridPost";

function SavedPosts({ user }) {
  const classes = useProfileTabsStyles();
  if (user.saved_posts.length === 0) {
    return (
      <section className={classes.savedPostsSection}>
        <div className={classes.noContent}>
          <div className={classes.savePhotoIcon} />
          <Typography variant="h4">Save</Typography>
          <Typography align="center">
            Save photos and videos that you want to see again. No one is
            notified, and only you can see what you've saved.
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <article className={classes.article}>
      <div className={classes.postContainer}>
        {user.saved_posts.map(({ post }) => (
          <GridPost key={post.id} post={post} />
        ))}
      </div>
    </article>
  );
}

export default SavedPosts;
