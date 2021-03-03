import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  Zoom,
} from "@material-ui/core";
import React from "react";
import { useProfilePageStyles } from "../../styles";

function OptionsMenu() {
  const classes = useProfilePageStyles();
  const [showLogoutMessage, setShowLogoutMessage] = React.useState(false);

  function handleLogoutClick() {
    setShowLogoutMessage(true);
  }

  return (
    <Dialog
      open
      classes={{
        scrollPaper: classes.dialogScrollPaper,
        paper: classes.dialogPaper,
      }}
      TransitionComponent={Zoom}
    >
      {showLogoutMessage ? (
        <DialogTitle className={classes.dialogTitle}>
          Logging Out
          <Typography color="textSecondary">
            You need to log back in to continue using Instagram
          </Typography>
        </DialogTitle>
      ) : (
        <>
          <OptionsItem text="Change Password" />
          <OptionsItem text="Nametag" />
          <OptionsItem text="Authorized Apps" />
          <OptionsItem text="Notifications" />
          <OptionsItem text="Privacy and Security" />
          <OptionsItem text="Log Out" onClick={handleLogoutClick} />
          <OptionsItem text="Change Password" />
        </>
      )}
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
