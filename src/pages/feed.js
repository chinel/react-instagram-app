import React from "react";
import { useFeedPageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import { getDefaultPost } from "../data";
import FeedPost from "../components/feed/FeedPost";

function FeedPage() {
  const classes = useFeedPageStyles();

  return (
    <Layout>
      <div className={classes.container}>
        <div>
          {Array.from({ length: 5 }, () => getDefaultPost()).map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default FeedPage;
