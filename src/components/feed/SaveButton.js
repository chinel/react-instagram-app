import React from "react";
import { RemoveIcon, SaveIcon } from "../../icons";
import { useFeedPostStyles } from "../../styles";
import { UserContext } from "../../App";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_POST, UNSAVE_POST } from "../../graphql/mutations";

function SaveButton({ savedPosts, postId }) {
  const classes = useFeedPostStyles();
  const { currentUserId, feedIds } = React.useContext(UserContext);
  const isAlreadySaved = savedPosts.some(
    ({ user_id }) => user_id === currentUserId
  );
  const [saved, setSaved] = React.useState(isAlreadySaved);
  const Icon = saved ? RemoveIcon : SaveIcon;
  const onClick = saved ? handleRemove : handleSave;
  const [savePost] = useMutation(SAVE_POST);
  const [removePost] = useMutation(UNSAVE_POST);
  const variables = {
    postId,
    userId: currentUserId,
  };

  function handleSave() {
    //console.log("saved");
    setSaved(true);
    savePost({ variables });
  }

  function handleRemove() {
    // console.log("removed");
    setSaved(false);
    removePost({ variables });
  }

  return <Icon className={classes.saveIcon} onClick={onClick} />;
}

export default SaveButton;
