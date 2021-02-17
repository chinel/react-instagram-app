import React from "react";
import { useNavbarStyles } from "../../styles";
import { AppBar } from "@material-ui/core";
import Logo from "./Logo";
import Search from "./Search";
import Links from "./Links";
import { useHistory } from "react-router-dom";
import Progress from "./Progress";

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const [loadingPage, setLoadingPage] = React.useState(true);
  const history = useHistory();
  const path = history.location.pathname;

  React.useEffect(() => {
    setTimeout(() => setLoadingPage(false), 10000);
  }, [path]);

  return (
    <>
      <Progress isAnimating={loadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          {!minimalNavbar && (
            <>
              <Search history={history} />
              <Links path={path} />
            </>
          )}
        </section>
      </AppBar>
    </>
  );
}

export default Navbar;
