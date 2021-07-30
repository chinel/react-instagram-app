import { Button, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../../App";
import { useFeedPostStyles } from "../../styles";

function Comment({ postId }) {
  const classes = useFeedPostStyles();
  const { feedIds, currentUserId } = useContext(UserContext);
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

export default Comment;
