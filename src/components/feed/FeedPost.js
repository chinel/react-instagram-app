import { Button, Divider, Hidden, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { CommentIcon, MoreIcon, ShareIcon } from "../../icons";
import { useFeedPostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import Comment from "./Comment";
import FollowSuggestions from "../shared/FollowSuggestions";

function FeedPost({ post, index }) {
  const classes = useFeedPostStyles();
  const [showCaption, setShowCaption] = React.useState(false);
  const { id, media, likes, user, caption, comments } = post;
  const showFollowSuggestion = index === 1;
  return (
    <>
      <article className={classes.article}>
        {/*Feed Post Header */}
        <div className={classes.postHeader}>
          {user && <UserCard user={user} />}
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
            <SaveButton />
          </div>
          <Typography className={classes.like} variant="subtitle2">
            <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
          </Typography>

          <div className={showCaption ? classes.expanded : classes.collapsed}>
            <Link to={`/${user.username}`}>
              <Typography
                variant="subtitle2"
                component="span"
                className={classes.username}
              >
                {user.username}
              </Typography>
            </Link>
            {showCaption ? (
              <Typography
                variant="body2"
                component="span"
                dangerouslySetInnerHTML={{ __html: caption }}
              />
            ) : (
              <div className={classes.captionWrapper}>
                <HTMLEllipsis
                  unsafeHTML={caption}
                  className={classes.caption}
                  maxLine="0"
                  ellipsis="..."
                  basedOn="letters"
                />
                <Button
                  className={classes.moreButton}
                  onClick={() => setShowCaption(true)}
                >
                  more
                </Button>
              </div>
            )}
          </div>

          <Link to={`/p/${id}`}>
            <Typography
              className={classes.commentsLink}
              variant="body2"
              component="div"
            >
              View all {comments.length} comments
            </Typography>
          </Link>

          {comments.map((comment) => (
            <div key={comment.id}>
              <Link to={`/${comment.user.username}`}>
                <Typography
                  variant="subtitle2"
                  component="span"
                  className={classes.commentUsername}
                >
                  {comment.user.username}
                </Typography>{" "}
                <Typography variant="body2" component="span">
                  {comment.content}
                </Typography>
              </Link>
            </div>
          ))}
          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
        </div>
        <Hidden xsDown>
          <Divider />
          <Comment />
        </Hidden>
      </article>
      {showFollowSuggestion && <FollowSuggestions />}
    </>
  );
}

export default FeedPost;
