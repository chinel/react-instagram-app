import React from "react";
import { useFeedPageStyles } from "../styles";
import Layout from "../components/shared/Layout";
import UserCard from "../components/shared/UserCard";
import { getDefaultPost } from "../data";
import FeedSideSuggestions from "../components/feed/FeedSideSuggestions";
import { Hidden } from "@material-ui/core";
import LoadingScreen from "../components/shared/LoadingScreen";
import { LoadingLargeIcon } from "../icons";
import FeedPostSkeleton from "../components/feed/FeedPostSkeleton";
import { UserContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_FEED } from "../graphql/queries";

const FeedPost = React.lazy(() => import("../components/feed/FeedPost"));

function FeedPage() {
  const classes = useFeedPageStyles();
  const { me, feedIds } = React.useContext(UserContext);
  const [isEndOfFeed] = React.useState(false);
  const variables = { feedIds, limit: 2 };
  const { data, loading } = useQuery(GET_FEED, { variables });

  // let loading = false;
  if (loading) return <LoadingScreen />;

  return (
    <Layout>
      <div className={classes.container}>
        {/*Feed Posts */}
        <div>
          {Array.from({ length: 5 }, () => getDefaultPost()).map(
            (post, index) => (
              <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
                <FeedPost post={post} index={index} />
              </React.Suspense>
            )
          )}
        </div>
        {/*Sidebar */}
        <Hidden smDown>
          <div className={classes.sidebarContainer}>
            <div className={classes.sidebarWrapper}>
              <UserCard user={me} avatarSize={50} />
              <FeedSideSuggestions />
            </div>
          </div>
        </Hidden>
        {!isEndOfFeed && <LoadingLargeIcon />}
      </div>
    </Layout>
  );
}

export default FeedPage;
