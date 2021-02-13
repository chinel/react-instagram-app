import React from "react";
import { MoreIcon } from "../../icons";
import { useFeedPostStyles } from "../../styles";
import UserCard from "../shared/UserCard";

function FeedPost({ post }) {
  const classes = useFeedPostStyles();
  const { media } = post;
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

          </div>
        </div>
      </article>
    </>
  );
}

export default FeedPost;
