import React from "react";
import { RemoveIcon, SaveIcon } from "../../icons";
import { useFeedPostStyles } from "../../styles";

function SaveButton() {
  const classes = useFeedPostStyles();
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

export default SaveButton;
