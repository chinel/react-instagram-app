import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  Zoom,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../auth";
import { useProfilePageStyles } from "../../styles";

function OptionsMenu({ handleCloseMenu }) {
  const classes = useProfilePageStyles();
  const { signOut } = React.useContext(AuthContext);
  const [showLogoutMessage, setShowLogoutMessage] = React.useState(false);
  const history = useHistory();
  function handleLogoutClick() {
    setShowLogoutMessage(true);
    setTimeout(() => {
      signOut();
      history.push("/accounts/login");
    }, 2000);
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
          <OptionsItem text="Cancel" onClick={handleCloseMenu} />
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
