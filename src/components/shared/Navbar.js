import React from "react";
import { useNavbarStyles } from "../../styles";
import { AppBar } from "@material-ui/core";
import Logo from "./Logo";
import Search from "./Search";
import Links from "./Links";
import { useHistory } from "react-router-dom";

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <AppBar className={classes.appBar}>
      <section className={classes.section}>
        <Logo />
        {!minimalNavbar && (
          <>
            <Search />
            <Links path={path} />
          </>
        )}
      </section>
    </AppBar>
  );
}

export default Navbar;
