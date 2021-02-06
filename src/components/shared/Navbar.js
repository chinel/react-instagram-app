import React from "react";
import { useNavbarStyles } from "../../styles";
import { AppBar } from "@material-ui/core";

function Navbar() {
  const classes = useNavbarStyles();

  return (
    <AppBar className={classes.appBar}>
      <section className={classes.section}>
        <Logo />
      </section>
    </AppBar>
  );
}

export default Navbar;
