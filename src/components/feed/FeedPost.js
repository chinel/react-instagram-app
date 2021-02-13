import React from "react";
import { Link } from "react-router-dom";
import { CommentIcon, MoreIcon, ShareIcon } from "../../icons";
import { useFeedPostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import LikeButton from "./LikeButton";

function FeedPost({ post }) {
  const classes = useFeedPostStyles();
  const { id, media } = post;
  return (
    <>
      <article className={classes.article}>
        {/*Feed Post Header */}
        <div className={classes.postHeader}>
          <UserCard />
          <MoreIcon className={classes.moreIcon} />
        </div>
        {/*Feed Post Image */}
        <div>
          <img src={media} alt="Post Media" className={classes.image} />
        </div>
        {/*Feed Post Buttons*/}
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
          </div>
        </div>
      </article>
    </>
  );
}

export default FeedPost;
