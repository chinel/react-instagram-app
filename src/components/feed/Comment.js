import { useMutation } from "@apollo/react-hooks";
import { Button, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { UserContext } from "../../App";
import { CREATE_COMMENT } from "../../graphql/mutations";
import { useFeedPostStyles } from "../../styles";

function Comment({ postId }) {
  const classes = useFeedPostStyles();
  const { feedIds, currentUserId } = useContext(UserContext);
  const [content, setContent] = React.useState("");
  const [createComment] = useMutation(CREATE_COMMENT);

  function handleAddComment() {
    const variables = {
      content,
      postId,
      userId: currentUserId,
    };
    createComment({ variables, update: handleUpdate });
  }

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
        onClick={handleAddComment}
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
