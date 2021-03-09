import { Typography } from "@material-ui/core";
import React from "react";
import { useProfileTabsStyles } from "../../styles";
import GridPost from "../shared/GridPost";

function ProfilePosts({ user, isOwner }) {
  const classes = useProfileTabsStyles();
  if (user.posts.length === 0) {
    return (
      <section className={classes.profilePostsSection}>
        <div className={classes.noContent}>
          <div className={classes.uploadPhotoIcon} />
          <Typography variant="h4">
            {isOwner ? "Upload a Photo" : "No Photos"}
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <article className={classes.article}>
      <div className={classes.postContainer}>
        {user.posts.map((post) => (
          <GridPost key={post.id} post={post} />
        ))}
      </div>
    </article>
  );
}

export default ProfilePosts;
