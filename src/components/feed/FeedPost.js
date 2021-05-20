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
import OptionsDialog from "../shared/OptionsDialog";

function FeedPost({ post, index }) {
  const classes = useFeedPostStyles();
  const [showCaption, setShowCaption] = React.useState(false);
  const [showOptionsDialog, setShowOptionsDialog] = React.useState(false);
  const {
    id,
    media,
    likes,
    likes_aggregate,
    saved_posts,
    location,
    user,
    caption,
    comments,
    comments_aggregate,
    created_at,
  } = post;
  const showFollowSuggestion = index === 1;
  const likesCount = likes_aggregate.aggregate.count;
  const commentsCount = comments_aggregate.aggregate.count;
  return (
    <>
      <article
        className={classes.article}
        style={{ marginBottom: showFollowSuggestion && 30 }}
      >
        {/*Feed Post Header */}
        <div className={classes.postHeader}>
          {user && <UserCard user={user} location={location} />}
          <MoreIcon
            className={classes.moreIcon}
            onClick={() => setShowOptionsDialog(true)}
          />
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
          <Typography className={classes.likes} variant="subtitle2">
            <span>{likesCount === 1 ? "1 like" : `${likesCount} likes`}</span>
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
              View all {commentsCount} comments
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
            {created_at}
          </Typography>
        </div>
        <Hidden xsDown>
          <Divider />
          <Comment />
        </Hidden>
      </article>
      {showFollowSuggestion && <FollowSuggestions />}
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setShowOptionsDialog(false)} />
      )}
    </>
  );
}

export default FeedPost;
