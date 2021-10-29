import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { UserContext } from "../../App";
import { LIKE_POST, UNLIKE_POST } from "../../graphql/mutations";
import { LikeIcon, UnlikeIcon } from "../../icons";
import { useFeedPostStyles } from "../../styles";
import { GET_FEED } from "../../graphql/queries";

function LikeButton({ postId, authorId, likes }) {
  let classes = useFeedPostStyles();
  const { currentUserId, feedIds } = React.useContext(UserContext);
  const isAlreadyLiked = likes.some(({ user_id }) => user_id === currentUserId);
  const [liked, setLiked] = React.useState(isAlreadyLiked);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const variables = {
    postId,
    userId: currentUserId,
    profileId: authorId,
  };

  function handleUpdate(cache, result) {
    const variables = { limit: 2, feedIds };
    const data = cache.readQuery({
      query: GET_FEED,
      variables,
    });
    //console.log({ result, data });
    const typename = result.data.insert_likes?.__typename;
    const count = typename === "likes_mutation_response" ? 1 : -1;
    const posts = data.posts.map((post) => ({
      ...post,
      likes_aggregate: {
        ...post.likes_aggregate,
        aggregate: {
          ...post.likes_aggregate.aggregate,
          count: post.likes_aggregate.aggregate.count + count,
        },
      },
    }));
    cache.writeQuery({ query: GET_FEED, data: { posts } });
  }

  function handleLike() {
    //console.log("like");
    setLiked(true);
    likePost({ variables, update: handleUpdate });
  }

  function handleUnlike() {
    // console.log("unlike");
    setLiked(false);
    unlikePost({ variables, update: handleUpdate });
  }

  return <Icon className={className} onClick={onClick} />;
}

export default LikeButton;
