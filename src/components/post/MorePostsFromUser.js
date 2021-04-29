import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { getDefaultPost, defaultUser } from "../../data";
import { GET_MORE_POSTS_FROM_USER, GET_POST } from "../../graphql/queries";
import { LoadingLargeIcon } from "../../icons";
import { useMorePostsFromUserStyles } from "../../styles";
import GridPost from "../shared/GridPost";

function MorePostsFromUser({ postId }) {
  const classes = useMorePostsFromUserStyles();
  const variables = { postId };
  const { data, loading } = useQuery(GET_POST, { variables });

  //here we will get back data, since we have data variable above it will conflict
  //so we need to rename it below, we renamed it to morePosts by destructuring and remaning it
  const [
    getMorePostsFromUser,
    { data: morePosts, loading: loading2 },
  ] = useLazyQuery(GET_MORE_POSTS_FROM_USER);

  React.useEffect(() => {
    if (loading) return;
    const userId = data.posts_by_pk.user.id;
    const postId = data.posts_by_pk.id;
    const variables = { userId, postId };
    getMorePostsFromUser({ variables });
  }, [data, loading, getMorePostsFromUser]);

  return (
    <div className={classes.container}>
      {loading || loading2 ? (
        <LoadingLargeIcon />
      ) : (
        <>
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

          <article className={classes.article}>
            <div className={classes.postContainer}>
              {morePosts?.posts.map((post, index) => (
                <GridPost key={index} post={post} />
              ))}
            </div>
          </article>
        </>
      )}
    </div>
  );
}

export default MorePostsFromUser;
