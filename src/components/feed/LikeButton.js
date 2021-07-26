import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { UserContext } from "../../App";
import { LIKE_POST, UNLIKE_POST } from "../../graphql/mutations";
import { LikeIcon, UnlikeIcon } from "../../icons";
import { useFeedPostStyles } from "../../styles";

function LikeButton({ postId, authorId, likes }) {
  let classes = useFeedPostStyles();
  const { currentUserId } = React.useContext(UserContext);
  const isAlreadyLiked = likes.some(({ user_id }) => user_id === currentUserId);
  const [liked, setLiked] = React.useState(isAlreadyLiked);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;
  const [likePost] = useMutation(LIKE_POST);
  const [unLikePost] = useMutation(UNLIKE_POST);
  const variables = {
    postId,
    userId: currentUserId,
    profileId: authorId,
  };

  function handleLike() {
    //console.log("like");
    setLiked(true);
    likePost({ variables });
  }

  function handleUnlike() {
    console.log("unlike");
    setLiked(false);
  }

  return <Icon className={className} onClick={onClick} />;
}

export default LikeButton;
