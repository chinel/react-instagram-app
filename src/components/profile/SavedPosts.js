import { Typography } from "@material-ui/core";
import React from "react";
import { useProfileTabsStyles } from "../../styles";

function SavedPosts({ user }) {
  const classes = useProfileTabsStyles();
  return (
    <section className={classes.savedPostsSection}>
      <div className={classes.noContent}>
        <div className={classes.savePhotoIcon} />
        <Typography variant="h4">Save</Typography>
        <Typography align="center">
          Save photos and videos that you want to see again. No one is notified,
          and only you can see what you've saved.
        </Typography>
      </div>
    </section>
  );
}

export default SavedPosts;
