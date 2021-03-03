import { Dialog, Zoom } from "@material-ui/core";
import React from "react";
import { useProfilePageStyles } from "../../styles";

function OptionsMenu() {
  const classes = useProfilePageStyles();

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper,
      }}
      TransitionComponent={Zoom}
    ></Dialog>
  );
}

export default OptionsMenu;
