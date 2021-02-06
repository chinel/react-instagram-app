import React from "react";
import { useNavbarStyles } from "../../styles";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

function Logo() {
  const classes = useNavbarStyles();
  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="Instagram" className={classes.logo} />
        </div>
      </Link>
    </div>
  );
}

export default Logo;
