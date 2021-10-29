import { useQuery } from "@apollo/react-hooks";
import { Typography } from "@material-ui/core";
import React from "react";
import { UserContext } from "../../App";
import { EXPLORE_POSTS } from "../../graphql/queries";
import { LoadingLargeIcon } from "../../icons";
import { useExploreGridStyles } from "../../sgit tyles";
import GridPost from "../shared/GridPost";

function ExploreGrid() {
  const classes = useExploreGridStyles();
  const { feedIds } = React.useContext(UserContext);
  const variables = { feedIds };
  const { data, loading } = useQuery(EXPLORE_POSTS, { variables });

  return (
    <>
      <Typography
        color="textSecondary"
        variant="subtitle2"
        component="h2"
        gutterBottom
        className={classes.typography}
      >
        Explore
      </Typography>
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <article className={classes.article}>
          <div className={classes.postContainer}>
            {data.posts.map((post, index) => (
              <GridPost key={index} post={post} />
            ))}
          </div>
        </article>
      )}
    </>
  );
}

export default ExploreGrid;
