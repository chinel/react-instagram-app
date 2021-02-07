import React from "react";
import { useLoginPageStyles } from "../../styles";
import FacebookIconBlue from "../../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../../images/facebook-icon-white.png";
import { Button } from "@material-ui/core";

function LoginWithFacebook({ color, iconColor }) {
  const classes = useLoginPageStyles();
  const facebookIcon =
    iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;
  return (
    <Button fullWidth color={color}>
      <img
        src={facebookIcon}
        alt="Facebook Icon"
        className={classes.facebookIcon}
      />
      Log In with Facebook
    </Button>
  );
}
export default LoginWithFacebook;
