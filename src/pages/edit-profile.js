import React from "react";
import Layout from "../components/shared/Layout";
import { useEditProfilePageStyles } from "../styles";
import {
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

function EditProfilePage({ history }) {
  const classes = useEditProfilePageStyles();
  const [showDrawer, setShowDrawer] = React.useState(false);

  function handleToggleDrawer() {
    setShowDrawer((prev) => !prev);
  }

  function handleSelected(index) {
    const path = history.location.pathname;
    switch (index) {
      case 0:
        return path.includes("edit");
      default:
        break;
    }
  }

  function handleListClick(index) {
    switch (index) {
      case 0:
        history.push("/accounts/edit");
        break;
      default:
        break;
    }
  }

  const options = [
    "Edit Profile",
    "Change Password",
    "Apps and Websites",
    "Email and SMS",
    "Push Notifications",
    "Manage Contacts",
    "Privacy and Security",
    "Login Activity",
    "Emails from Instagram",
  ];

  const drawer = (
    <List>
      {options.map((option, index) => (
        <ListItem
          key={option}
          button
          selected={handleSelected(index)}
          onClick={() => handleListClick(index)}
          classes={{
            selected: classes.listItemSelected,
            button: classes.listItemButton,
          }}
        >
          <ListItemText primary={option}></ListItemText>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Layout title="Edit Profile">
      <section className={classes.section}>
        <IconButton
          edge="start"
          onClick={handleToggleDrawer}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <nav>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="left"
              open={showDrawer}
              onClose={handleToggleDrawer}
              classes={{ paperAnchorLeft: classes.temporaryDrawer }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </section>
    </Layout>
  );
}

export default EditProfilePage;
