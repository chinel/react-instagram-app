import React from "react";
import { LikeIcon, UnlikeIcon } from "../../icons";
import { useFeedPostStyles } from "../../styles";

function LikeButton() {
  const classes = useFeedPostStyles();
  const [liked, setLiked] = React.useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;
  const onClick = liked ? handleUnlike : handleLike;

  function handleLike(){

  }

  function handleUnlike(){
      
  }

   
  return <Icon className={className} onClick={onClick}/>;
}

export default LikeButton;
