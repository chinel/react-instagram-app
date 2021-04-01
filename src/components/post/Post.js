import {
  Button,
  Divider,
  Hidden,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { CommentIcon, MoreIcon, ShareIcon } from "../../icons";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import OptionsDialog from "../shared/OptionsDialog";
import { defaultPost } from "../../data";
import { LikeIcon, UnlikeIcon } from "../../icons";
import { RemoveIcon, SaveIcon } from "../../icons";
import PostSkeleton from "./PostSkeleton";
import { useSubscription } from "@apollo/react-hooks";
import { GET_POST } from "../../graphql/subscriptions";

function Post({ postId }) {
  const classes = usePostStyles();
  // const [showLoading, setLoading] = React.useState(true);
  const [showOptionsDialog, setShowOptionsDialog] = React.useState(false);
  const variables = { postId };
  const { data, loading } = useSubscription(GET_POST, { variables });

  //setTimeout(() => setLoading(false), 2000);

  if (loading) return <PostSkeleton />;
  const {
    id,
    media,
    likes,
    user,
    caption,
    comments,
    created_at,
  } = data.posts_by_pk;

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        {/*Post Header */}
        <div className={classes.postHeader}>
          {user && <UserCard user={user} avatarSize={32} />}
          <MoreIcon
            className={classes.moreIcon}
            onClick={() => setShowOptionsDialog(true)}
          />
        </div>
        {/*Post Image */}
        <div className={classes.postImage}>
          <img src={media} alt="Post Media" className={classes.image} />
        </div>
        {/*Post Buttons*/}
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
            <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
          </Typography>

          <div
            style={{
              overflow: "scroll",
              padding: "16px 12px !important",
              height: "100%",
            }}
          >
            <AuthorCaption
              user={user}
              createdAt={created_at}
              caption={caption}
            />
            {comments.map((comment) => (
              <UserComment key={comment.id} comment={comment} />
            ))}
          </div>

          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
          <Hidden xsDown>
            <div className={classes.comment}>
              <Divider />
              <Comment />
            </div>
          </Hidden>
        </div>
      </article>
      {showOptionsDialog && (
        <OptionsDialog onClose={() => setShowOptionsDialog(false)} />
      )}
    </div>
  );
}

function AuthorCaption() {}

function UserComment() {}

function LikeButton() {
  let classes = usePostStyles();
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

function SaveButton() {
  const classes = usePostStyles();
  const [saved, setSaved] = React.useState(false);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleRemove : handleSave;

  function handleSave() {
    console.log("saved");
    setSaved(true);
  }

  function handleRemove() {
    console.log("removed");
    setSaved(false);
  }

  return <Icon className={classes.saveIcon} onClick={onClick} />;
}

function Comment() {
  const classes = usePostStyles();
  const [content, setContent] = React.useState("");
  return (
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder="Add a comment..."
        multiline
        rowsMax={2}
        rows={1}
        onChange={(event) => setContent(event.target.value)}
        className={classes.textField}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline,
          },
        }}
      />
      <Button
        color="primary"
        className={classes.commentButton}
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>
  );
}

export default Post;
