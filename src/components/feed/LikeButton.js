import React from "react";
import { UserContext } from "../../App";
import { LikeIcon, UnlikeIcon } from "../../icons";
import { useFeedPostStyles } from "../../styles";

function LikeButton({ postId, authorId, likes }) {
  let classes = useFeedPostStyles();
  const { currentUserId } = React.useContext(UserContext);
  const isAreadyLiked = likes.some(({ user_id }) => user_id === currentUserId);
  const [liked, setLiked] = React.useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;

  function handleLike() {
    console.log("like");
    setLiked(true);
  }

  function handleUnlike() {
    console.log("unlike");
    setLiked(false);
  }

  return <Icon className={className} onClick={onClick} />;
}

export default LikeButton;
