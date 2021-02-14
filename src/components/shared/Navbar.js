import React from "react";
import { useNavbarStyles } from "../../styles";
import { AppBar } from "@material-ui/core";
import Logo from "./Logo";

function Navbar() {
  const classes = useNavbarStyles();

  return (
    <AppBar className={classes.appBar}>
      <section className={classes.section}>
        <Logo />
        <Search />
        <Links />
      </section>
    </AppBar>
  );
}

export default Navbar;
