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
    >
      <OptionsItem text="Change Password" />
      <OptionsItem text="Nametag" />
      <OptionsItem text="Authorized Apps" />
      <OptionsItem text="Notifications" />
      <OptionsItem text="Privacy and Security" />
      <OptionsItem text="Log Out" />
      <OptionsItem text="Change Password" />
    </Dialog>
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
