import { Button, Dialog, Zoom } from "@material-ui/core";
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

function OptionsItem({ text, onClick }) {
  return (
    <>
      <Button style={{ padding: "12px 8px" }} onClick={onClick}>
        {text}
      </Button>
    </>
  );
}

export default OptionsMenu;
